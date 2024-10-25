<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

interface Weather {
  location: string;
  temp_celsius: number;
  temp_fahrenheit: number;
  condition: string;
}

const props = defineProps<{ recipient: string }>();

const userWeather = ref<Weather>({
  location: "",
  temp_celsius: 0,
  temp_fahrenheit: 0,
  condition: "",
});

const recipientWeather = ref<Weather>({
  location: "",
  temp_celsius: 0,
  temp_fahrenheit: 0,
  condition: "",
});

const city = ref("");
const state = ref("");
const isSharing = ref(false);

async function fetchWeather() {
  try {
    const response = await fetchy(`/api/weather/${props.recipient}`, "GET");
    const userKey = Object.keys(response)[0];
    const recipientKey = Object.keys(response)[1];

    userWeather.value = response[userKey];
    recipientWeather.value = response[recipientKey];
    isSharing.value = true;
  } catch (error) {
    console.error("Error fetching weather", error);
  }
}

async function turnOnShare() {
  try {
    await fetchy("/api/weather/share/on", "POST", {
      body: { city: city.value, state: state.value },
    });
    await fetchWeather();
  } catch (error) {
    console.error("Error turning on share", error);
  }
}

async function turnOffShare() {
  try {
    await fetchy("/api/weather/share/off", "POST");
    isSharing.value = false;
  } catch (error) {
    console.error("Error turning off share", error);
  }
}

onMounted(async () => {
  await fetchWeather();
});
</script>

<template>
  <div class="weathering-container">
    <div>
      <div class="weather-inputs">
        <label>
          City:
          <input v-model="city" placeholder="Enter city" />
        </label>
        <label>
          State:
          <input v-model="state" placeholder="Enter state" />
        </label>
        <button @click="turnOnShare" class="turn-on-btn">Submit (Turn on Share)</button>
        <button @click="turnOffShare" class="turn-off-btn">Turn Off Share</button>
      </div>

      <div v-if="isSharing" class="weather-info">
        <div class="weather-block">
          <h3>Your Weather</h3>
          <p>Location: {{ userWeather.location }}</p>
          <p>Temperature: {{ userWeather.temp_celsius }}°C / {{ userWeather.temp_fahrenheit }}°F</p>
          <p>Condition: {{ userWeather.condition }}</p>
        </div>

        <div class="weather-block">
          <h3>{{ props.recipient }}'s Weather</h3>
          <p>Location: {{ recipientWeather.location }}</p>
          <p>Temperature: {{ recipientWeather.temp_celsius }}°C / {{ recipientWeather.temp_fahrenheit }}°F</p>
          <p>Condition: {{ recipientWeather.condition }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "Header.css";
.weathering-container {
  justify-content: space-around;
  padding: 10px 0px;
  background-color: var(--header-bg);
}

.weather-controls {
  display: flex;
  align-items: center;
}

.weather-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 5px;
}

input {
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.turn-on-btn {
  background-color: #9fbfad;
}

.turn-off-btn {
  background-color: #f7a49e;
}

button {
  margin-right: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 15px;
}

.weather-block {
  width: 45%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
