<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  user: { username: string };
}>();

// add the video call api stuff here
function startVideoCall() {
  console.log("Starting video call with", props.user.username);
}
</script>

<template>
  <div class="chat-header">
    <div class="actions">
      <span @click="startVideoCall"> Video Call 📹 </span>
      |
      <span> Mood Map 😊 </span>
      |
      <span> Post-It Wall 📝 </span>
      |
      <span> Weathering With You 📝 </span>
    </div>
  </div>
</template>

<style scoped>
.chat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.actions span {
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 1rem;
}

.actions span:hover {
  background-color: #ccc;
}
</style>
