<script setup lang="ts">
import { defineEmits, ref } from "vue";

const newPostContent = ref("");
const newPostColor = ref<string>("#ffffff");
const emit = defineEmits(["createPost", "closeOverlay"]);

function createPost() {
  if (!newPostContent.value) return;

  const newPost = {
    _id: Date.now().toString(),
    content: newPostContent.value,
    position: {
      top: Math.random() * 400,
      left: Math.random() * 400,
    },
    options: {
      backgroundColor: newPostColor.value,
    },
  };

  emit("createPost", newPost);

  newPostContent.value = "";
  newPostColor.value = "#ffffff";
  emit("closeOverlay");
}
</script>

<template>
  <div class="post-overlay">
    <div class="post" :style="{ backgroundColor: newPostColor }">
      <div class="colors">
        <span
          v-for="color in ['#FFFFFF', '#9FBFAD', '#F7A49E', '#D1B6ED', '#75C1FB', '#EFCC6E']"
          :key="color"
          :style="{ backgroundColor: color, border: newPostColor === color ? '2px solid black' : '2px solid #ddd' }"
          @click="newPostColor = color"
          class="color-circle"
        ></span>
      </div>

      <textarea v-model="newPostContent" :style="{ backgroundColor: newPostColor }" placeholder="Aa"></textarea>

      <div class="actions">
        <button @click="$emit('closeOverlay')">
          <img src="@/assets/images/deletenote.png" alt="Delete Note" class="delete-post-btn" />
        </button>
        <button @click="createPost" class="create-post-btn">Post</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "PostOverlay.css";
</style>
