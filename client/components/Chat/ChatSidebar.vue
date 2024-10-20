<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { computed, onMounted, ref } from "vue";

// Store for friends list
const friends = ref<string[]>([]);
// State for search query
const searchQuery = ref("");

// Fetch the friends list from the backend
async function fetchFriends() {
  try {
    const result = await fetchy("/api/friends", "GET");
    friends.value = result as string[];
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

// Filter the friends list based on search query
const filteredFriends = computed(() => friends.value.filter((friend) => friend.toLowerCase().includes(searchQuery.value.toLowerCase())));

// Emit event when a friend is selected for chat
const emit = defineEmits(["select-chat"]);

function selectFriend(friend: string) {
  emit("select-chat", friend);
}

// Fetch friends when the component is mounted
onMounted(async () => {
  await fetchFriends();
});
</script>

<template>
  <div class="chat-sidebar">
    <!-- Search Bar -->
    <input type="text" v-model="searchQuery" placeholder="Search Tether" class="search-bar" />
    <!-- Friends List -->
    <div class="friends-list">
      <div v-for="friend in filteredFriends" :key="friend" @click="selectFriend(friend)" class="friend-item">
        <div class="friend-avatar">
          <img src="@/assets/images/profile.png" alt="Avatar" />
        </div>
        <div class="friend-info">
          <p>{{ friend }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-sidebar {
  width: 280px;
  padding: 1rem;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.search-bar {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 100%;
}

.friends-list {
  overflow-y: auto;
  flex-grow: 1;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.friend-item:hover {
  background-color: #e0e0e0;
}

.friend-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.friend-info {
  display: flex;
  flex-direction: column;
}

.friend-info p {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}

.last-message {
  color: #999;
  font-size: 0.85rem;
}
</style>
