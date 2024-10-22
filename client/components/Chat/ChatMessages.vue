<script setup lang="ts">
import { ref } from "vue";

interface Message {
  content: string;
  sender: string;
}

const emit = defineEmits(["send-message"]);
const props = defineProps<{
  messages: Message[];
  currentUser: string;
}>();

const message = ref("");

function sendMessage() {
  if (message.value.trim() !== "") {
    emit("send-message", message.value);
    message.value = "";
  }
}

function messageClass(message: Message) {
  return message.sender === props.currentUser ? "my-message" : "their-message";
}
</script>

<template>
  <div class="chat-box">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="messageClass(message)">
        {{ message.content }}
      </div>
    </div>

    <div class="chat-input">
      <input v-model="message" type="text" placeholder="Type a message..." @keyup.enter="sendMessage" />
      <button @click="sendMessage">
        <img src="@/assets/images/send.png" alt="Send" />
      </button>
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
  width: auto;
}

.my-message,
.their-message {
  border-radius: 2rem;
  padding: 10px 20px;
  margin-bottom: 10px;
  max-width: 60%;
  word-wrap: break-word;
}

.my-message {
  background-color: #d6dde3;
  text-align: right;
  margin-left: auto;
}

.their-message {
  text-align: left;
  background-color: #fed1cf;
  width: auto;
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
}

button {
  border: none;
  background: none;
  cursor: pointer;
}
</style>
