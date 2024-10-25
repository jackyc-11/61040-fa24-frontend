<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { computed, onMounted, ref } from "vue";

interface User {
  username: string;
}

const allUsers = ref<User[]>([]);
const removedUsers = ref<Set<string>>(new Set());
const requestedUsers = ref<Set<string>>(new Set());
const searchQuery = ref<string>("");

async function fetchUsers() {
  try {
    const result = await fetchy("/api/users", "GET");
    allUsers.value = result as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

const filteredUsers = computed(() => {
  return allUsers.value.filter((user) => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) && !removedUsers.value.has(user.username));
});

async function addFriend(username: string) {
  try {
    await fetchy(`/api/friend/requests/${username}`, "POST");
    requestedUsers.value.add(username);
  } catch (error) {
    console.error("Error adding friend:", error);
  }
}

async function cancelFriendRequest(username: string) {
  try {
    await fetchy(`/api/friend/requests/${username}`, "DELETE");
    requestedUsers.value.delete(username);
  } catch (error) {
    console.error("Error canceling friend request:", error);
  }
}

onMounted(async () => {
  await fetchUsers();
});
</script>

<template>
  <div class="add-friends-container">
    <h1>Add Friends</h1>
    <input v-model="searchQuery" type="text" placeholder="Search Tether" class="search-bar" />

    <ul class="users-list">
      <li v-for="user in filteredUsers" :key="user.username" class="user-item">
        <div class="user-avatar">
          <img src="@/assets/images/profile.png" alt="Avatar" />
        </div>
        <div class="user-info">
          <p>{{ user.username }}</p>
        </div>
        <div class="user-actions">
          <button v-if="requestedUsers.has(user.username)" @click="cancelFriendRequest(user.username)" class="cancel-request-btn">Cancel Request</button>
          <button v-else @click="addFriend(user.username)" class="add-friend-btn">Add Friend</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.add-friends-container {
  padding: 1rem;
  overflow-y: auto;
}

h1 {
  font-size: 1.5rem;
}

.search-bar {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 95%;
}

.users-list {
  padding: 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--separator);
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  flex-grow: 1;
}

.cancel-request-btn {
  background-color: #f7a49e;
}

.add-friend-btn {
  background-color: #9fbfad;
}

.user-actions button {
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>
