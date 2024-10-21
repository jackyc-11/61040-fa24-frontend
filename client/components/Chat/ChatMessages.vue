<script setup lang="ts">
import { ref } from "vue";

interface Message {
  content: string;
  sender: string;
}

const emit = defineEmits(["send-message"]);
const props = defineProps<{ messages: Message[] }>();

const message = ref("");

function sendMessage() {
  if (message.value.trim() !== "") {
    emit("send-message", message.value);
    message.value = "";
  }
}

function messageClass(message: Message) {
  return message.sender === "me" ? "my-message" : "their-message";
}
</script>

<template>
  <div class="chat-box">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="messageClass(message)" class="message-item">
        <p>{{ message.content }}</p>
      </div>
    </div>

    <div class="chat-input">
      <input v-model="message" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
      <button @click="sendMessage"><img src="@/assets/images/send.png" alt="Send" /></button>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
}

.my-message {
  text-align: right;
  background-color: #ddd;
  border-radius: 20px;
  padding: 0.5rem;
  width: auto;
}

.their-message {
  text-align: left;
  background-color: #ddd;
  padding: 10px;
}

.chat-input {
  display: flex;
  padding: 10px;
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
  border: none;
  background: none;
  cursor: pointer;
}
</style>
