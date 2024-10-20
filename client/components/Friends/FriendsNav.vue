<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="friends-nav">
    <!-- Friends List -->
    <RouterLink to="/friends/list" class="nav-item">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/friendslist.png" alt="Friends List" /></span>
        <span class="text">Friends List</span>
      </div>
      <span class="arrow">➤</span>
    </RouterLink>

    <!-- Add Friends -->
    <RouterLink to="/friends/add" class="nav-item">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/addfriends.png" alt="Add Friends" /></span>
        <span class="text">Add Friends</span>
      </div>
      <span class="arrow">➤</span>
    </RouterLink>

    <!-- Friend Requests -->
    <RouterLink to="/friends/requests" class="nav-item">
      <div class="icon-text">
        <span class="icon"><img src="@/assets/images/friendrequests.png" alt="Friend Requests" /></span>
        <span class="text">Friend Requests</span>
      </div>
      <span class="arrow">➤</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.friends-nav {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #f4f4f4;
  padding: 1rem;
  border-right: 1px solid #ccc;
}

.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: black;
  border-radius: 8px;
  background-color: #fff;
}

.nav-item:hover {
  background-color: #e0e0e0;
}

.icon-text {
  display: flex;
  align-items: center;
}

.icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.arrow {
  font-size: 1.5rem;
  color: #888;
}
</style>
