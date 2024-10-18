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

    <div class="chat-area">
      <ChatSidebar @select-chat="selectChat"></ChatSidebar>

      <div class="chat-window">
        <ChatHeader v-if="selectedUser" :user="selectedUser"></ChatHeader>
        <ChatMessages :messages="currentMessages"></ChatMessages>
        <ChatInput @send-message="sendMessage"></ChatInput>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages-page {
  display: flex;
  height: 100vh;
}

.chat-area {
  display: flex;
  flex-grow: 1;
}

.chat-window {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
