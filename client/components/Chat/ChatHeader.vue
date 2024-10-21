<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  user: { username: string };
}>();

console.log("ChatHeader User:", props.user);

// add the video call api stuff here
function startVideoCall() {
  console.log("Starting video call with", props.user.username);
}
</script>

<template>
  <div class="chat-header">
    <div class="user-info">
      <span>{{ user.username }}</span>
    </div>
    <div class="actions">
      <button @click="startVideoCall">📹</button>
      <button>⋮</button>
    </div>
  </div>
</template>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.user-info {
  display: flex;
  align-items: center;
}

.actions button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
