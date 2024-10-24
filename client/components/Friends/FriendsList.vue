<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const friends = ref<string[]>([]);

async function fetchFriends() {
  try {
    const result = await fetchy("/api/friends", "GET");
    friends.value = result as string[];
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

async function removeFriend(friend: string) {
  try {
    await fetchy(`/api/friends/${friend}`, "DELETE");
    friends.value = friends.value.filter((f) => f !== friend);
  } catch (error) {
    console.error("Error removing friend:", error);
  }
}

onMounted(async () => {
  await fetchFriends();
});
</script>

<template>
  <div class="friends-container">
    <h1>Friends List</h1>
    <ul class="friends-list">
      <li v-for="friend in friends" :key="friend" class="friend-item">
        <div class="friend-avatar">
          <img src="@/assets/images/profile.png" alt="Avatar" />
        </div>
        <div class="friend-info">
          <p>{{ friend }}</p>
        </div>
        <div class="friend-actions">
          <button @click="removeFriend(friend)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.friends-container {
  padding: 1rem;
  overflow-y: auto;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.friends-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--separator);
}

.friend-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.friend-info {
  flex-grow: 1;
  margin-left: 10px;
}

.friend-info p {
  margin: 0;
  font-size: 1rem;
}

.friend-actions button {
  background-color: #ccc;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

.friend-actions button:hover {
  background-color: #ff1a1a;
}
</style>
