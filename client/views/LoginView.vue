<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="login-page">
    <div class="left-section">
      <h1>Tether</h1>
      <img src="@/assets/images/tether_logo.png" alt="Tether Logo" class="logo" />
      <p>Stay connected, no matter the distance.</p>
    </div>
    <div class="right-section">
      <LoginForm />
      <RegisterForm />
    </div>
  </main>
</template>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
}

.left-section p {
  font-size: 1.25rem;
  text-align: center;
  max-width: 250px;
}

.logo {
  height: 150px;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>
