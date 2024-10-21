<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { computed, onMounted, ref } from "vue";

const friends = ref<string[]>([]);
const searchQuery = ref("");
const selectedFriend = ref<string | null>(null);

async function fetchFriends() {
  try {
    const result = await fetchy("/api/friends", "GET");
    friends.value = result as string[];
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

const filteredFriends = computed(() => friends.value.filter((friend) => friend.toLowerCase().includes(searchQuery.value.toLowerCase())));

const emit = defineEmits(["select-chat"]);

function selectFriend(friend: string) {
  selectedFriend.value = friend;
  emit("select-chat", friend);
}

onMounted(async () => {
  await fetchFriends();
});
</script>

<template>
  <div class="chat-sidebar">
    <input type="text" v-model="searchQuery" placeholder="Search Tether" class="search-bar" />
    <div v-for="friend in filteredFriends" :key="friend" @click="selectFriend(friend)" :class="['friend-item', { selected: selectedFriend === friend }]">
      <div class="friend-avatar">
        <img src="@/assets/images/profile.png" alt="Avatar" />
      </div>
      <div class="friend-info">
        <p>{{ friend }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
}

.search-bar {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: auto;
  margin: 1rem;
}

.friends-list {
  overflow-y: auto;
}

.friend-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
}

.friend-item:hover,
.selected {
  background-color: var(--select-bg);
}

.friend-avatar img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}

.friend-info {
  display: flex;
  flex-direction: column;
}

.last-message {
  color: #999;
  font-size: 0.85rem;
}
</style>
