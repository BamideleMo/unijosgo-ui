<script setup>
import { onMounted, ref } from "vue";
import SuperMeta from "../components/SuperMeta.vue";
import { useUserStore } from "../store/user-store";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const userStore = useUserStore();

let name = ref(null);
let phone = ref(null);
let phone_verification = ref(null);

const issueContent = ref("");

const errorMessage = ref(null);

onMounted(async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  name.value = userStore.name || null;
  phone.value = userStore.phone || null;
  phone_verification.value = userStore.phone_verification || null;

  try {
    let res = await axios.get(API_URL + "posts/" + route.params.id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    issueContent.value = res;
  } catch (error) {
    errorMessage.value = error.response;
  }
});

const title = "Issue #" + route.params.id;
</script>

<template>
  <SuperMeta
    :title="title"
    name="description"
    :content="
      'Read the fun and interesting gist for Jossites in Issue #' +
      route.params.id +
      ' of UniJosGist.'
    "
  />
  <main>
    <div v-if="userStore.uuser_id" class="">
      <div v-if="issueContent !== ''">v</div>
      <div v-else class="text-black text-center">
        <img src="/loading.gif" alt="" class="w-60 mx-auto" />
        <p class="text-sm text-gray-400 -mt-10">Loading Gist...</p>
      </div>
    </div>
  </main>
</template>
