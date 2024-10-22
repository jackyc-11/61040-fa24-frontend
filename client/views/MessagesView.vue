<script setup lang="ts">
import ChatHeader from "@/components/Chat/ChatHeader.vue";
import ChatMessages from "@/components/Chat/ChatMessages.vue";
import ChatSidebar from "@/components/Chat/ChatSidebar.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

interface UserDoc {
  username: string;
}

interface Message {
  content: string;
  sender: string;
}

const userStore = useUserStore();
const selectedUser = ref<UserDoc | null>(null);
const currentMessages = ref<Message[]>([]);

async function selectChat(user: UserDoc) {
  selectedUser.value = user;
  currentMessages.value = [];
  try {
    const response = await fetchy(`/api/messages/${user.username}`, "GET");
    currentMessages.value = response.map((msg: any) => ({
      content: msg.content,
      sender: msg.sender,
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    currentMessages.value = [];
  }
}

async function sendMessage(content: string) {
  if (!selectedUser.value || !userStore.currentUsername) return;

  const newMessage: Message = {
    content,
    sender: "me",
  };

  try {
    const response = await fetchy(`/api/messages/${selectedUser.value.username}`, "POST", {
      body: { content },
    });
    currentMessages.value.push(response.message || newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    currentMessages.value.push(newMessage);
  }
}
</script>

<template>
  <div class="messages-page">
    <SideNav />

    <ChatSidebar @select-chat="selectChat" />

    <div class="chat-window" v-if="selectedUser && userStore.currentUsername">
      <ChatHeader :user="selectedUser" />
      <div class="messages-container">
        <ChatMessages :messages="currentMessages" :currentUser="userStore.currentUsername" @send-message="sendMessage" />
      </div>
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

.messages-container {
  display: flex;
  flex-direction: column;
  height: 90%;
}

.chat-window {
  flex-direction: column;
}

.no-chat-selected {
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #888;
}
</style>
