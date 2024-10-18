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
      </li>
    </ul>
  </div>
</template>

<style scoped>
.friends-container {
  padding: 1rem;
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
  border-bottom: 1px solid #ddd;
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
</style>
