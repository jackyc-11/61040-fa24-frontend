<script setup lang="ts">
import { defineProps } from "vue";

interface Message {
  content: string;
  sender: string;
}

const props = defineProps<{
  messages: Message[];
}>();

function messageClass(message: Message) {
  return message.sender === "me" ? "my-message" : "their-message";
}
</script>

<template>
  <div class="chat-messages">
    <div v-for="(message, index) in messages" :key="index" :class="messageClass(message)" class="message-item">
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.chat-messages {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
}

.my-message {
  text-align: right;
  background-color: #d1f7d1;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.their-message {
  text-align: left;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
