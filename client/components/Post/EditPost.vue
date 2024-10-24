<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const props = defineProps<{ post: any }>();
const emit = defineEmits(["postUpdated", "closeEditor", "refreshPosts"]);

const postContent = ref(props.post.content);
const postColor = ref(props.post.options?.backgroundColor || "#FFFFFF");

async function savePost() {
  try {
    await fetchy(`/api/posts/${props.post._id}/${props.post.recipient}`, "PATCH", {
      body: { content: postContent.value, options: { backgroundColor: postColor.value } },
    });

    emit("postUpdated", {
      _id: props.post._id,
      content: postContent.value,
      options: { backgroundColor: postColor.value, position: props.post.options.position },
    });

    emit("closeEditor");
  } catch (error) {
    console.error("Error saving post:", error);
  }
}

async function deletePost() {
  try {
    await fetchy(`/api/posts/${props.post._id}/${props.post.recipient}`, "DELETE");
    emit("refreshPosts");
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
</script>

<template>
  <div class="post-overlay">
    <div class="post" :style="{ backgroundColor: postColor }">
      <div class="colors">
        <span
          v-for="color in ['#FFFFFF', '#9FBFAD', '#F7A49E', '#D1B6ED', '#75C1FB', '#EFCC6E']"
          :key="color"
          :style="{ backgroundColor: color, border: postColor === color ? '2px solid black' : '2px solid #ddd' }"
          @click="postColor.value = color"
          class="color-circle"
        ></span>
      </div>

      <textarea v-model="postContent" :style="{ backgroundColor: postColor }" placeholder="Aa"></textarea>

      <div class="actions">
        <button @click="deletePost">
          <img src="@/assets/images/deletenote.png" alt="Delete Post" class="delete-post-btn" />
        </button>

        <button @click="savePost" class="save-post-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "PostOverlay.css";
</style>
