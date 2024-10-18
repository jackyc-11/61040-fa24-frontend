<script setup lang="ts">
import FriendsNav from "@/components/Friends/FriendsNav.vue";
import SideNav from "@/components/MainPage/SideNav.vue";
</script>

<template>
  <div class="friends-view">
    <SideNav />
    <FriendsNav />
    <div class="friends-content">
      <RouterView />
      <!-- dynamically render FriendsList, AddFriends, or FriendRequests based on route -->
    </div>
  </div>
</template>

<style scoped>
.friends-view {
  display: flex;
}

.friends-content {
  flex-grow: 1;
}
</style>
