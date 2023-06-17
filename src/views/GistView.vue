<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useUserStore } from "../store/user-store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const volumeContent = ref(null);
const errorMessage = ref(null);

const API_URL = import.meta.env.VITE_API_URL;

const getVolume = (val) => {
  axios
    .get(API_URL + "gists/" + val, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      console.log(response);
      volumeContent.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(async () => {
  if (route.query.v) {
    getVolume(route.query.v);
  } else {
    axios
      .get(API_URL + "gists/latest", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((response) => {
        volumeContent.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
</script>

<template>
  <Header />
  <Loading v-if="!volumeContent" />
  <div v-else class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-2">
    <div
      class="content leading-snug lg:leading-loose space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <h2>🗓️ {{ volumeContent.post_date }}:</h2>
      <p>Hi, {{ userStore.name }}</p>
      <div v-html="volumeContent.gist"></div>
    </div>
  </div>
  <Footer />
</template>
