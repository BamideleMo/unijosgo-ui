<script setup>
import { onMounted, ref } from "vue";
import SuperMeta from "../components/SuperMeta.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useUserStore } from "../store/user-store";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const userStore = useUserStore();

const volumeContent = ref("");

const errorMessage = ref(null);

onMounted(async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    let res = await axios.get(API_URL + "gists/" + route.params.id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    volumeContent.value = res.data.data;
  } catch (error) {
    errorMessage.value = error.response;
  }
});

const title = "Volume #" + route.params.id;
</script>

<template>
  <SuperMeta
    :title="title"
    name="description"
    :content="volumeContent.meta_data"
  />
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-2">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <!-- <h1 class="h1 font-semibold text-xl text-center">
        Gist No. {{ volumeContent.volume }}
      </h1> -->
      <h2>🗓️ {{ volumeContent.post_date }}:</h2>
      <p>Hi, {{ userStore.name }}</p>
      <div v-html="volumeContent.gist"></div>
    </div>
  </div>
  <Footer />
</template>
