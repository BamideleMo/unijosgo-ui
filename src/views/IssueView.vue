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
      <div class="">
        <div class="content2 space-y-4">
          <hr />
          <div v-html="issueContent.data.data.content2"></div>
        </div>
        <div class="text-left mt-20">
          <div class="text-sm drop-shadow-lg">
            <div class="bg-blue-50 border border-blue-100 rounded p-3 pb-4">
              <ul class="list-disc space-y-3 text-black mx-6">
                <li>
                  <b>Archive:</b>
                  Check out gist from previous weeks:
                  <RouterLink
                    to="/issues"
                    class="border-b border-red-600 hover:opacity-60"
                  >
                    Click here</RouterLink
                  >.
                </li>
                <li>
                  <b>UniJosGist WhatsApp TV 📺:</b>
                  Join to stay in the loop and for more fun:
                  <a href="/" class="border-b border-red-600 hover:opacity-60"
                    >Click here now</a
                  >.
                </li>
              </ul>
            </div>
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
