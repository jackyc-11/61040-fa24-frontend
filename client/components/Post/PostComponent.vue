<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["refreshPosts"]);

const isEditing = ref(false);
const content = ref(props.post.content);

async function savePost() {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "PATCH", {
      body: { content: content.value },
    });
    emit("refreshPosts");
  } catch (error) {
    console.error("Error saving post:", error);
  } finally {
    isEditing.value = false;
  }
}

async function deletePost() {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
    emit("refreshPosts");
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
</script>

<template>
  <div class="post">
    <div v-if="isEditing">
      <textarea v-model="content"></textarea>
      <div class="buttons">
        <button @click="savePost">Save</button>
        <button @click="deletePost">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 150px;
  height: 150px;
  background-color: inherit;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

textarea {
  width: 100%;
  height: 80px;
  resize: none;
  border-radius: 4px;
  padding: 5px;
}

button {
  padding: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
