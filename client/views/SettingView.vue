<script setup lang="ts">
import SideNav from "@/components/MainPage/SideNav.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Login" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Login" });
}
</script>

<template>
  <div class="settings-page">
    <SideNav />

    <main class="settings-content column">
      <h1>Settings for {{ currentUsername }}</h1>
      <button class="pure-button pure-button-primary" @click="logout">Logout</button>
      <button class="button-error pure-button" @click="delete_">Delete User</button>
      <UpdateUserForm />
    </main>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  height: 100vh;
}

.settings-content {
  margin: auto;
  width: 70%;
  height: 80%;
  background-color: var(--content-bg);
  border-radius: 30px;
  box-shadow: var(--shadow);
}
</style>
