<script setup lang="ts">
import ChatHeader from "@/components/Chat/ChatHeader.vue";
import ChatMessages from "@/components/Chat/ChatMessages.vue";
import ChatSidebar from "@/components/Chat/ChatSidebar.vue";
import MoodMap from "@/components/HeaderActions/MoodMap.vue";
import VideoCall from "@/components/HeaderActions/VideoCall.vue";
import WeatheringWithYou from "@/components/HeaderActions/WeatheringWithYou.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
import PostItWall from "@/components/Post/PostItWall.vue";
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
const showMoodMap = ref(false);
const showWeathering = ref(false);
const showPostItWall = ref(false);
const showVideoCall = ref(false);

function toggleMoodMap() {
  showMoodMap.value = !showMoodMap.value;
  if (showMoodMap.value) {
    showWeathering.value = false;
    showPostItWall.value = false;
    showVideoCall.value = false;
  }
}

function toggleWeathering() {
  showWeathering.value = !showWeathering.value;
  if (showWeathering.value) {
    showMoodMap.value = false;
    showPostItWall.value = false;
    showVideoCall.value = false;
  }
}

function togglePostItWall() {
  showPostItWall.value = !showPostItWall.value;
  if (showPostItWall.value) {
    showMoodMap.value = false;
    showWeathering.value = false;
    showVideoCall.value = false;
  }
}

function toggleVideoCall() {
  showVideoCall.value = !showVideoCall.value;
  if (showVideoCall.value) {
    showMoodMap.value = false;
    showWeathering.value = false;
    showPostItWall.value = false;
  }
}

async function selectChat(user: UserDoc) {
  selectedUser.value = user;
  currentMessages.value = [];
  showMoodMap.value = false;
  showWeathering.value = false;
  showPostItWall.value = false;
  showVideoCall.value = false;
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
      <ChatHeader
        :user="selectedUser"
        :moodMapToggled="showMoodMap"
        :weatheringToggled="showWeathering"
        :postItWallToggled="showPostItWall"
        :videoCallToggled="showVideoCall"
        @toggle-mood-map="toggleMoodMap"
        @toggle-weathering="toggleWeathering"
        @toggle-post-it-wall="togglePostItWall"
        @toggle-video-call="toggleVideoCall"
      />
      <div v-if="showMoodMap" class="mood-map-container">
        <MoodMap :recipient="selectedUser.username" />
      </div>
      <div v-if="showWeathering" class="weathering-container">
        <WeatheringWithYou :recipient="selectedUser.username" />
      </div>
      <div v-if="showPostItWall" class="post-it-wall-container">
        <PostItWall :recipient="selectedUser.username" />
      </div>
      <div v-if="showVideoCall" class="video-call-container">
        <VideoCall />
      </div>
      <div class="messages-container" v-if="!showPostItWall">
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
  overflow: hidden;
}

.chat-sidebar {
  margin: 1rem;
  width: 30%;
  border-radius: 20px;
}

.chat-window,
.no-chat-selected {
  margin: 1rem;
  width: 60%;
  display: flex;
  border-radius: 20px;
  background-color: var(--content-bg);
  overflow: hidden;
}

.messages-container {
  display: flex;
  flex-direction: column;
  height: 90%;
  overflow-y: auto;
  flex-grow: 1;
}

.chat-window {
  flex-direction: column;
}

.active-toggle {
  background-color: var(--select-bg);
}

.no-chat-selected {
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #888;
}
</style>
