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
    let res = await axios.get(API_URL + "posts/intro", {
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
    <div v-if="issueContent !== ''">
      <div class="content space-y-4">
        <div
          class="flex justify-between text-gray-600 pt-8 pb-4 drop-shadow-lg"
        >
          <div>Issue #{{ route.params.id }}</div>
          <div>
            {{ issueContent.data.data.post_date }}
          </div>
        </div>

        <div class="">Hey {{ name }} 👋</div>
        <div v-html="issueContent.data.data.content1"></div>
      </div>
      <div v-if="!userStore.uuser_id">
        <div
          class="bg-gradient-to-r from-violet-900 to-blue-900 px-2 sm:px-10 py-6 rounded-lg my-6 text-center text-sm sm:text-base text-white"
        >
          <h2 class="">
            Subscribe to Continue reading.
            <b>300+ students have already subscribed</b>. Click the button
            below. It is FREE
          </h2>
          <div class="text-center mt-6 mb-3">
            <RouterLink
              to="/subscribe"
              class="bg-black cursor-pointer drop-shadow-lg p-3 rounded-lg text-white space-x-3 hover:opacity-60"
            >
              <span>Subscribe</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 inline-block -mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </RouterLink>
          </div>
          <div class="text-center mt-8 text-lg">
            Already Subscribed?
            <RouterLink
              to="/sign-in"
              class="cursor-pointer border-b-4 border-red-600 rounded hover:opacity-60"
              >Sign In</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-black">
      <div class="text-center">
        <img src="/loading.gif" alt="" class="w-60 mx-auto" />
        <p class="text-sm text-gray-400">Loading latest gist...</p>
      </div>
    </div>
  </main>
</template>
