<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { computed, onMounted, ref } from "vue";

interface UserDoc {
  username: string;
}

const friends = ref<UserDoc[]>([]);
const searchQuery = ref("");
const selectedFriend = ref<UserDoc | null>(null);

async function fetchFriends() {
  try {
    const result = await fetchy("/api/friends", "GET");

    friends.value = result.map((username: string) => ({ username }));
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

const filteredFriends = computed(() => friends.value.filter((friend) => friend.username.toLowerCase().includes(searchQuery.value.toLowerCase())));

const emit = defineEmits(["select-chat"]);

function selectFriend(friend: UserDoc) {
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
    <div v-for="friend in filteredFriends" :key="friend.username" @click="selectFriend(friend)" :class="['friend-item', { selected: selectedFriend && selectedFriend.username === friend.username }]">
      <div class="friend-avatar">
        <img src="@/assets/images/profile.png" alt="Avatar" />
      </div>
      <div class="friend-info">
        <p>{{ friend.username }}</p>
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
  margin: 0px 10px;
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
