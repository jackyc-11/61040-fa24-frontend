<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import CreatePost from "./CreatePost.vue";
import EditPost from "./EditPost.vue";

interface PostOptions {
  backgroundColor: string;
  position: { top: number; left: number };
}

interface Post {
  _id: string;
  author: string;
  recipient: string;
  content: string;
  options: PostOptions;
}

const props = defineProps<{ recipient: string }>();

const posts = ref<Post[]>([]);
const showNote = ref(false);
const editingPost = ref<Post | null>(null);

const isDragging = ref(false);
const draggedPost = ref<Post | null>(null);
const startX = ref(0);
const startY = ref(0);
const hasDragged = ref(false);

async function getPosts() {
  try {
    const response = await fetchy(`/api/posts/${props.recipient}`, "GET");
    posts.value = response.map((post: any) => ({
      _id: post._id,
      author: post.author,
      recipient: post.recipient,
      content: post.content,
      options: {
        position: post.options?.position,
        backgroundColor: post.options.backgroundColor || "#ffffff",
      },
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function createNewPost(post: Post) {
  try {
    const response = await fetchy("/api/posts", "POST", {
      body: { recipient: props.recipient, content: post.content, options: { backgroundColor: post.options.backgroundColor, position: post.options.position } },
    });
    posts.value.push(response.post);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

function toggleNote() {
  showNote.value = !showNote.value;
}

function editPost(post: Post) {
  editingPost.value = post;
}

function updatePostInArray(updatedPost: Post) {
  const index = posts.value.findIndex((p) => p._id === updatedPost._id);
  if (index !== -1) {
    posts.value[index] = {
      ...posts.value[index],
      content: updatedPost.content,
      options: updatedPost.options,
    };
  }
}

function closeEditor() {
  editingPost.value = null;
}

function onMouseDown(post: Post, event: MouseEvent) {
  if (!post.options.position) {
    post.options.position = { top: 0, left: 0 };
  }

  isDragging.value = true;
  draggedPost.value = post;
  hasDragged.value = false;

  startX.value = event.clientX - post.options.position.left;
  startY.value = event.clientY - post.options.position.top;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event: MouseEvent) {
  if (!isDragging.value || !draggedPost.value) return;

  draggedPost.value.options.position.left = event.clientX - startX.value;
  draggedPost.value.options.position.top = event.clientY - startY.value;
  hasDragged.value = true;
}

async function onMouseUp() {
  if (isDragging.value && draggedPost.value) {
    try {
      await fetchy(`/api/posts/${draggedPost.value._id}/${props.recipient}`, "PATCH", {
        body: {
          content: draggedPost.value.content,
          options: {
            position: draggedPost.value.options.position,
            backgroundColor: draggedPost.value.options.backgroundColor,
          },
        },
      });
    } catch (error) {
      console.error("Failed to update post position:", error);
    }
  }

  isDragging.value = false;
  draggedPost.value = null;

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

function handlePostClick(post: Post) {
  if (!hasDragged.value) {
    editPost(post);
  }
}

onMounted(async () => {
  await getPosts();
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <div class="post-it-wall">
    <button @click="toggleNote" class="add-post-btn">
      <img src="@/assets/images/addnote.png" alt="Add Post" />
    </button>

    <div
      v-for="post in posts"
      :key="post._id"
      class="post-item"
      :style="{
        top: post.options?.position?.top + 'px',
        left: post.options?.position?.left + 'px',
        backgroundColor: post.options?.backgroundColor || '#ffffff',
      }"
      @click="handlePostClick(post)"
      @mousedown="onMouseDown(post, $event)"
    >
      <PostComponent :post="post" />
    </div>

    <CreatePost v-if="showNote" @createPost="createNewPost" @closeOverlay="toggleNote" />

    <EditPost
      v-if="editingPost"
      :post="editingPost"
      @postUpdated="updatePostInArray"
      @closeEditor="closeEditor"
      @refreshPosts="
        async () => {
          await getPosts();
          editingPost = null;
        }
      "
    />
  </div>
</template>

<style scoped>
.post-it-wall {
  position: relative;
  width: 80%;
  height: 80vh;
  background-color: #b77f42;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  left: 10%;
  top: 5%;
}

.post-item {
  position: absolute;
  cursor: pointer;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow-y: scroll;
}

.add-post-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
