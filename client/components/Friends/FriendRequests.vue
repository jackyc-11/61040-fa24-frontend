<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

interface FriendRequest {
  id: string;
  from: string;
  to: string;
  status: string;
}

const requests = ref<FriendRequest[]>([]);
const currentUser = ref<string>("");

async function fetchCurrentUser() {
  try {
    const session = await fetchy("/api/session", "GET");
    currentUser.value = session.username;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}

async function fetchRequests() {
  try {
    const result = await fetchy("/api/friend/requests", "GET");

    requests.value = result.filter((request: FriendRequest) => request.status === "pending" && request.to === currentUser.value);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
  }
}

async function acceptRequest(fromUsername: string) {
  try {
    await fetchy(`/api/friend/accept/${fromUsername}`, "PUT");
    requests.value = requests.value.filter((request) => request.from !== fromUsername);
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
}

async function rejectRequest(fromUsername: string) {
  try {
    await fetchy(`/api/friend/reject/${fromUsername}`, "PUT");
    requests.value = requests.value.filter((request) => request.from !== fromUsername);
  } catch (error) {
    console.error("Error rejecting friend request:", error);
  }
}

onMounted(async () => {
  await fetchCurrentUser();
  await fetchRequests();
});
</script>

<template>
  <div class="friend-requests-container">
    <h1>Friend Requests</h1>

    <ul v-if="requests.length > 0" class="requests-list">
      <li v-for="request in requests" :key="request.id" class="request-item">
        <div class="request-avatar">
          <img src="@/assets/images/profile.png" alt="Avatar" />
        </div>
        <div class="request-info">
          <p>{{ request.from }}</p>
        </div>
        <div class="request-actions">
          <button class="accept-btn" @click="acceptRequest(request.from)">Accept</button>
          <button class="delete-btn" @click="rejectRequest(request.from)">Delete</button>
        </div>
      </li>
    </ul>
    <p v-else class="no-requests-message">No pending friend requests</p>
  </div>
</template>

<style scoped>
.friend-requests-container {
  padding: 1rem;
  overflow-y: auto;
}

h1 {
  font-size: 1.5rem;
}

.requests-list {
  padding: 0;
}

.request-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--separator);
}

.request-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.request-info {
  flex-grow: 1;
}

.request-info p {
  margin: 0;
  font-size: 1rem;
}

.request-actions {
  display: flex;
  gap: 1rem;
}

.accept-btn {
  background-color: #9fbfad;
}

.delete-btn {
  background-color: #f7a49e;
}

.accept-btn,
.delete-btn {
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

.no-requests-message {
  font-size: 1.2rem;
  color: #888;
}
</style>
