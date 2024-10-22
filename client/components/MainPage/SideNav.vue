<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="side-nav">
    <RouterLink :to="{ name: 'Messages' }" class="nav-icon" title="Messages">
      <img src="@/assets/images/messages-section.png" alt="Messages Icon" />
    </RouterLink>

    <RouterLink :to="{ name: 'Friends' }" class="nav-icon" title="Friends">
      <img src="@/assets/images/friend-section.png" alt="Friends Icon" />
    </RouterLink>

    <div class="spacer"></div>

    <RouterLink :to="{ name: 'Settings' }" class="nav-icon" title="Settings">
      <img src="@/assets/images/setting-section.png" alt="Settings Icon" />
    </RouterLink>
  </nav>
</template>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.nav-icon {
  margin-bottom: 1rem;
}

.nav-icon:hover {
  cursor: pointer;
}

.spacer {
  flex-grow: 1;
}
</style>
