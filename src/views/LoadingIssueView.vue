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

  if (userStore.uuser_id) {
    try {
      let res = await axios.get(API_URL + "posts/latest", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      router.push({
        path: "/volume/" + res.data.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    router.push({
      path: "/call-to-action",
    });
  }
});
const title = "Loading...";
</script>
<template>
  <SuperMeta :title="title" name="description" content="Loading latest Gist!" />

  <div class="text-black">
    <div class="text-center">
      <img src="/loading.gif" alt="" class="w-60 mx-auto" />
      <p class="text-sm text-gray-400 -mt-10">Loading Gist...</p>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
