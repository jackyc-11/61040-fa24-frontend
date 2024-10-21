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
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Search Tether" />
    </div>

    <ul class="users-list">
      <li v-for="user in filteredUsers" :key="user.username" class="user-item">
        <div class="user-avatar">
          <img src="@/assets/images/profile.png" alt="Avatar" />
        </div>
        <div class="user-info">
          <p>{{ user.username }}</p>
        </div>
        <div class="user-actions">
          <button v-if="requestedUsers.has(user.username)" @click="cancelFriendRequest(user.username)">Cancel Request</button>
          <button v-else @click="addFriend(user.username)">Add Friend</button>
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
  margin-bottom: 1rem;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  padding: 0.5rem;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.users-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  flex-grow: 1;
  margin-left: 10px;
}

.user-info p {
  margin: 0;
  font-size: 1rem;
}

.user-actions button {
  background-color: #ccc;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 0.5rem;
}

.user-actions button:hover {
  background-color: #bbb;
}
</style>
