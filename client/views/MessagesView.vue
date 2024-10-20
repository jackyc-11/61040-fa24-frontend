<script setup lang="ts">
import ChatHeader from "@/components/Chat/ChatHeader.vue";
import ChatInput from "@/components/Chat/ChatInput.vue";
import ChatMessages from "@/components/Chat/ChatMessages.vue";
import ChatSidebar from "@/components/Chat/ChatSidebar.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
import { ref } from "vue";

interface UserDoc {
  username: string;
  password: string;
}

interface Message {
  content: string;
  sender: string;
}

const selectedUser = ref<UserDoc | null>(null);
const currentMessages = ref<Message[]>([]);

function selectChat(user: UserDoc) {
  selectedUser.value = user;
  currentMessages.value = [];
}

function sendMessage(message: string) {
  currentMessages.value.push({ content: message, sender: "me" });
}
</script>

<template>
  <div class="messages-page">
    <SideNav />

    <ChatSidebar @select-chat="selectChat" />

    <div class="chat-window">
      <ChatHeader v-if="selectedUser" :user="selectedUser" />
      <ChatMessages :messages="currentMessages" />
      <ChatInput @send-message="sendMessage" />
    </div>
  </div>
</template>

<style scoped>
.messages-page {
  display: flex;
  height: 100vh;
}

.chat-sidebar {
  margin: 1rem;
  width: 30%;
  height: 90%;
  border-radius: 20px;
  border: 1px solid black; /* Add a dividing border */
}

.chat-window {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
