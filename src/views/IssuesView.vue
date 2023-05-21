<script setup>
import { onMounted, ref } from "vue";
import SuperMeta from "../components/SuperMeta.vue";
import { useUserStore } from "../store/user-store";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const userStore = useUserStore();

const archiveContent = ref("");

onMounted(async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    let res = await axios.get(API_URL + "posts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    archiveContent.value = res;
  } catch (error) {
    errorMessage.value = error.response;
  }
});

const title = "Archive";
</script>

<template>
  <SuperMeta
    :title="title"
    name="description"
    content="Read all posts on UniJosGist."
  />
  <div class="">
    <h1 class="h1 font-semibold text-lg">Archive</h1>
    <div class="content space-y-4 mt-4" v-if="archiveContent !== ''">
      <ol
        v-for="(value, key, index) in Object.entries(archiveContent.data.data)"
      >
        <li class="bg-blue-50 border border-blue-100 rounded p-3 text-sm">
          <span class="text-gray-600 flex justify-between text-xs">
            <b class="text-red-600">Issue #{{ value[1].issue }}</b>
            <span class="">{{ value[1].post_date }}</span>
          </span>
          <span class="block my-2">{{ value[1].topic_meta }}</span>
          <span class="block mt-3">
            <RouterLink
              :to="'/issue/' + value[1].id"
              class="text-xs bg-red-600 text-white p-1 rounded hover:opacity-60"
            >
              Check it out
            </RouterLink>
          </span>
        </li>
      </ol>
    </div>
    <div v-else class="text-black">
      <div class="text-center">
        <img src="/loading.gif" alt="" class="w-60 mx-auto" />
        <p class="text-sm text-gray-400 -mt-10">Loading Gist...</p>
      </div>
    </div>
  </div>
</template>

<style></style>
