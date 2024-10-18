<script setup lang="ts">
import { computed, ref } from "vue";

interface UserDoc {
  username: string;
  password: string;
}

const emit = defineEmits(["select-chat"]);

// FAKE DATA AS PLACEHOLDER
const users = ref<UserDoc[]>([
  { username: "JohnDoe", password: "password1" },
  { username: "MariaJane", password: "password2" },
]);

const searchQuery = ref("");

const filteredUsers = computed(() => users.value.filter((user) => user.username.toLowerCase().includes(searchQuery.value.toLowerCase())));

function selectUser(user: UserDoc) {
  emit("select-chat", user);
}
</script>

<template>
  <div class="chat-sidebar">
    <input type="text" v-model="searchQuery" placeholder="Search Tether" />
    <div class="chat-list">
      <div v-for="user in filteredUsers" :key="user.username" @click="selectUser(user)" class="chat-item">
        <div>
          <p>{{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-sidebar {
  width: 300px;
  padding: 1rem;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
}

.chat-list {
  overflow-y: auto;
  flex-grow: 1;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.chat-item:hover {
  background-color: #f0f0f0;
}
</style>
