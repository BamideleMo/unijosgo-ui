<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useUserStore } from "../store/user-store";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const content = ref(null);
const userStore = useUserStore();

onMounted(async () => {
  axios
    .get(API_URL + "gists", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      content.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <Header />
  <Loading v-if="!content" />
  <div v-else class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">All Gists</h1>
      <table cellpadding="0" cellspacing="0" class="w-full border border-black">
        <tr v-for="(item, index) in content" :key="index">
          <td class="border-b border-black p-4 lg:p-6">
            <span class="text-xs flex justify-between font-semibold"
              ><span class="">Gists #{{ item.volume }}</span
              ><span>{{ item.post_date }}</span></span
            >
            <RouterLink
              class="text-base text-red-900 hover:underline leading-none"
              :to="`/gist?volume=${item.volume}`"
              >{{ item.meta_data }}</RouterLink
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
  <Footer />
</template>

<style></style>
