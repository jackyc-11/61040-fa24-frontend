<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

const props = defineProps<{ recipient: string }>();

const yourMood = ref("");
const recipientMood = ref("");

async function fetchMoods() {
  try {
    const response = await fetchy(`/api/moods/${props.recipient}`, "GET");

    const moods = response;
    yourMood.value = moods.yourMood || "";
    recipientMood.value = moods.recipientMood || "";
  } catch (error) {
    console.error("Error fetching moods:", error);
  }
}

async function setMood() {
  try {
    await fetchy(`/api/moods`, "POST", { body: { mood: yourMood.value, recipient: props.recipient } });
  } catch (error) {
    // if (error.message.includes("Mood must be a valid emoji!")) {
    //   yourMood.value = "";
    // } else {
    console.error("Error setting mood:", error);
    // }
  }
}

async function removeMood() {
  try {
    await fetchy(`/api/moods`, "DELETE", { body: { recipient: props.recipient } });
    yourMood.value = "";
  } catch (error) {
    console.error("Error removing mood:", error);
  }
}

onMounted(async () => {
  await fetchMoods();
});
</script>

<template>
  <div class="mood-map">
    Type an emoji!
    <div class="mood-box">
      <span>You:</span>
      <input v-model="yourMood" maxlength="1" @input="setMood" />
      <img @click="removeMood" src="@/assets/images/x.png" alt="X" class="x-icon" />
    </div>
    <div class="mood-box">
      <span>{{ props.recipient }}:</span>
      <span class="emoji">{{ recipientMood }}</span>
    </div>
  </div>
</template>

<style scoped>
.mood-map {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 2px solid var(--base-bg);
}

.mood-box {
  display: flex;
  align-items: center;
}

input {
  width: 20px;
  margin: 0 10px;
  border-radius: 5px;
  justify-content: center;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

.x-icon:hover {
  cursor: pointer;
}

/* .emoji {
  background-color: grey;
  border: 3px solid black;
} */
</style>
