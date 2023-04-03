<script setup>
import { ref, onMounted } from "vue";

import axios from "axios";

import SuperMeta from "../components/SuperMeta.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";

const router = useRouter();

const userStore = useUserStore();

const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    let res = await axios.get(API_URL + "posts/latest", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    router.push({
      path: "/issue/" + res.data.data.id,
    });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      let res = await axios.get(API_URL + "posts/intro");
      router.push({
        path: "/unsubscribed/" + res.data.data.id,
      });
    } else {
      errorMessage.value = error.response;
    }
  }
});
const title = "Loading...";
</script>
<template>
  <SuperMeta :title="title" name="description" content="Loading latest Gist!" />

  <div class="text-black">
    <div v-if="isLoading" class="text-center">
      <img src="/loading.gif" alt="" class="w-60 mx-auto" />
      <p class="text-sm text-gray-400">Loading latest gist...</p>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
