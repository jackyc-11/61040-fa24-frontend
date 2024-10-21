<script setup lang="ts">
import ChatHeader from "@/components/Chat/ChatHeader.vue";
import ChatMessages from "@/components/Chat/ChatMessages.vue";
import ChatSidebar from "@/components/Chat/ChatSidebar.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
import { ref } from "vue";

interface UserDoc {
  username: string;
  // password: string;
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

    <div class="chat-window" v-if="selectedUser">
      <ChatHeader :user="selectedUser" />
      <ChatMessages :messages="currentMessages" @send-message="sendMessage" />
    </div>
    <div v-else class="no-chat-selected">
      <p>Select a user to start chatting</p>
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
  border-radius: 20px;
  border: 1px solid black;
}

.chat-window,
.no-chat-selected {
  margin: 1rem;
  width: 60%;
  display: flex;
  border-radius: 20px;
  border: 1px solid black;
  background-color: var(--content-bg);
}

.chat-window {
  flex-direction: column;
  overflow-y: auto;
}

.no-chat-selected {
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #888;
}
</style>
