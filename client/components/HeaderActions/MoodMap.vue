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
    const parts = response.split(`${props.recipient}:`);
    yourMood.value = parts[0].replace("You:", "").trim();
    recipientMood.value = parts[1].trim();
  } catch (error) {
    console.error("Error fetching moods:", error);
  }
}

async function setMood() {
  try {
    await fetchy(`/api/moods`, "POST", { body: { mood: yourMood.value, recipient: props.recipient } });
  } catch (error: any) {
    if (error.message.includes("Mood must be a valid emoji!")) {
      yourMood.value = "";
    } else {
      console.error("Error setting mood:", error);
    }
  }
}

async function removeMood() {
  try {
    await fetchy(`/api/moods/${props.recipient}`, "DELETE");
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
    <div class="inputemoji">
      Type an emoji!
      <input type="text" v-model="yourMood" maxlength="2" @input="setMood" />
      <img @click="removeMood" src="@/assets/images/x.png" alt="X" class="x-icon" />
    </div>
    <div class="mood-box">
      <span>You:</span>
      <span class="" emoji>{{ yourMood }}</span>
    </div>
    <div class="mood-box">
      <span>{{ props.recipient }}:</span>
      <span class="emoji">{{ recipientMood }}</span>
    </div>
  </div>
</template>

<style scoped>
@import "Header.css";
.mood-map {
  justify-content: space-around;
  padding: 10px 0px;
}

.inputemoji {
  display: flex;
  align-items: center;
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
