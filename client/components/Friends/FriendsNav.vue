<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="friends-nav">
    <!-- Friends List -->
    <RouterLink to="/friends/list" class="nav-item" :class="{ active: route.path === '/friends/list' }">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/friendslist.png" alt="Friends List" /></span>
        <span class="text">Friends List</span>
      </div>
    </RouterLink>

    <!-- Add Friends -->
    <RouterLink to="/friends/add" class="nav-item" :class="{ active: route.path === '/friends/add' }">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/addfriends.png" alt="Add Friends" /></span>
        <span class="text">Add Friends</span>
      </div>
    </RouterLink>

    <!-- Friend Requests -->
    <RouterLink to="/friends/requests" class="nav-item" :class="{ active: route.path === '/friends/requests' }">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/friendrequests.png" alt="Friend Requests" /></span>
        <span class="text">Friend Requests</span>
      </div>
    </RouterLink>
  </nav>
</template>

<style scoped>
.friends-nav {
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
}

.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  text-decoration: none;
  color: black;
  border-radius: 20px;
  background-color: #fff;
}

.nav-item:hover,
.nav-item.active {
  background-color: var(--select-bg);
}

.icon-text {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 10px;
}
</style>
