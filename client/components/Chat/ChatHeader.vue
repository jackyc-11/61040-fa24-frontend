<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  user: { username: string };
  moodMapToggled: boolean;
}>();

const emit = defineEmits(["toggle-mood-map", "start-video-call"]);

// add the video call api stuff here
function startVideoCall() {
  console.log("Starting video call with", props.user.username);
}

function toggleMoodMap() {
  emit("toggle-mood-map");
}
</script>

<template>
  <div class="chat-header">
    <div class="actions">
      <span @click="startVideoCall">
        Video Call
        <img src="@/assets/images/videocall.png" alt="Video Call" />
      </span>
      |
      <span @click="toggleMoodMap" :class="{ active: props.moodMapToggled }">
        Mood Map
        <img src="@/assets/images/emoji.png" alt="Emoji" />
      </span>
      |
      <span>
        Post-It Wall
        <img src="@/assets/images/notes.png" alt="Notes" />
      </span>
      |
      <span>
        Weathering With You
        <img src="@/assets/images/weather.png" alt="Weather" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.chat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid var(--base-bg);
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
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
}

.actions span:hover {
  background-color: #bbb7e9;
}

img {
  margin-left: 10px;
}

.active {
  background-color: #bbb7e9;
}
</style>
