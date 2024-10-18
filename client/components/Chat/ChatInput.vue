<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["send-message"]);

const message = ref("");

function sendMessage() {
  if (message.value.trim() !== "") {
    emit("send-message", message.value);
    message.value = "";
  }
}
</script>

<template>
  <div class="chat-input">
    <input v-model="message" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
    <button @click="sendMessage">➤</button>
  </div>
</template>

<style scoped>
.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  margin-right: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
}
</style>
