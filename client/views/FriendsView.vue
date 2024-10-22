<script setup lang="ts">
import FriendsNav from "@/components/Friends/FriendsNav.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
</script>

<template>
  <div class="friends-page">
    <SideNav />
    <FriendsNav />
    <div class="friends-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.friends-page {
  display: flex;
  height: 100vh;
}

.friends-nav {
  margin: 1rem;
  width: 30%;
  border-radius: 20px;
}

.friends-content {
  margin: 1rem;
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: var(--content-bg);
}
</style>
