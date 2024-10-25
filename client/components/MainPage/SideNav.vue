<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="side-nav">
    <img src="@/assets/images/tether_logo_sm.png" alt="Tether Logo" class="app-icon" />
    <RouterLink :to="{ name: 'Messages' }" :class="{ active: route.name === 'Messages' }" class="nav-icon" title="Messages">
      <img src="@/assets/images/dark-msg-section.png" alt="Messages Icon" />
    </RouterLink>

    <RouterLink :to="{ name: 'Friends' }" :class="{ active: route.name === 'Friends' }" class="nav-icon" title="Friends">
      <img src="@/assets/images/dark-friend-section.png" alt="Friends Icon" />
    </RouterLink>

    <div class="spacer"></div>

    <RouterLink :to="{ name: 'Settings' }" :class="{ active: route.name === 'Settings' }" class="nav-icon" title="Settings">
      <img src="@/assets/images/dark-setting-section.png" alt="Settings Icon" />
    </RouterLink>
  </nav>
</template>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.app-icon {
  margin-bottom: 1rem;
}

.nav-icon {
  margin-bottom: 1rem;
  border-radius: 10px;
  padding: 2px;
}

.nav-icon:hover {
  cursor: pointer;
}

.nav-icon.active,
.nav-icon:hover {
  background-color: #bac5c9;
}

.spacer {
  flex-grow: 1;
}
</style>
