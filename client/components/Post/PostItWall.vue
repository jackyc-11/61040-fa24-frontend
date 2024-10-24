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

async function getPosts() {
  try {
    const response = await fetchy(`/api/posts/${props.recipient}`, "GET");
    posts.value = response.map((post: any) => ({
      _id: post._id,
      author: post.author,
      recipient: post.recipient,
      content: post.content,
      options: {
        position: post.options.position || { top: Math.random() * 400, left: Math.random() * 400 },
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
    posts.value[index] = updatedPost;
  }
}

function closeEditor() {
  editingPost.value = null;
}

onMounted(async () => {
  await getPosts();
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
      :style="{ top: post.options?.position?.top + 'px', left: post.options?.position?.left + 'px', backgroundColor: post.options?.backgroundColor || '#ffffff' }"
      @click="editPost(post)"
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
