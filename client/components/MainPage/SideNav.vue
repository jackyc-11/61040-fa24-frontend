<script setup lang="ts">
import { RouterLink } from "vue-router";

const icons = {
  messages: "📄", // Placeholder for Messages icon
  friends: "👥", // Placeholder for Friends icon
  profile: "⚙️", // Placeholder for Profile (Settings) icon
};
</script>

<template>
  <nav class="side-nav">
    <!-- Messages icon (use named route) -->
    <RouterLink :to="{ name: 'Messages' }" class="nav-icon" title="Messages">
      <span>{{ icons.messages }}</span>
    </RouterLink>

    <!-- Friends icon (use named route) -->
    <RouterLink :to="{ name: 'Friends' }" class="nav-icon" title="Friends">
      <span>{{ icons.friends }}</span>
    </RouterLink>

    <!-- Profile (Settings) icon (use named route) -->
    <RouterLink :to="{ name: 'Settings' }" class="nav-icon" title="Profile">
      <span>{{ icons.profile }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  width: 60px;
  background-color: #f4f4f4;
  height: 100vh;
  border-right: 1px solid #ccc;
}

.nav-icon {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: black;
  text-decoration: none;
}

.nav-icon:hover {
  color: #007bff;
  cursor: pointer;
}
</style>
