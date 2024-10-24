<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  user: { username: string };
  moodMapToggled: boolean;
  weatheringToggled: boolean;
  postItWallToggled: boolean;
  videoCallToggled: boolean;
}>();

const emit = defineEmits(["toggle-mood-map", "toggle-weathering", "toggle-post-it-wall", "toggle-video-call"]);

function toggleMoodMap() {
  emit("toggle-mood-map");
}

function toggleWeathering() {
  emit("toggle-weathering");
}

function togglePostItWall() {
  emit("toggle-post-it-wall");
}

function toggleVideoCall() {
  emit("toggle-video-call");
}
</script>

<template>
  <div class="chat-header">
    <div class="actions">
      <span @click="toggleVideoCall" :class="{ active: props.videoCallToggled }">
        Video Call
        <img src="@/assets/images/videocall.png" alt="Video Call" />
      </span>
      |
      <span @click="toggleMoodMap" :class="{ active: props.moodMapToggled }">
        Mood Map
        <img src="@/assets/images/emoji.png" alt="Emoji" />
      </span>
      |
      <span @click="togglePostItWall" :class="{ active: props.postItWallToggled }">
        Post-It Wall
        <img src="@/assets/images/notes.png" alt="Notes" />
      </span>
      |
      <span @click="toggleWeathering" :class="{ active: props.weatheringToggled }">
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
  border-bottom: 2px solid var(--separator);
  font-weight: bold;
  background-color: white;
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
  background-color: var(--select-bg);
}

img {
  margin-left: 10px;
}

.active {
  background-color: var(--select-bg);
}
</style>
