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

const API_URL = import.meta.env.VITE_API_URL;
const content = ref(null);
const userStore = useUserStore();

const getUser = () => {
  axios
    .get(API_URL + "users/" + userStore.cid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      getArchive();
      // if (response.data.data.status === 'verified') {
      //     getArchive();
      // } else {
      //     router.push({
      //         name: "welcome",
      //     });

      // }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getArchive = () => {
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
};

onMounted(async () => {
  getUser();
});
</script>

<template>
  <Header />
  <Loading v-if="!content" />
  <div v-else class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">All Posts.</h1>
      <table cellpadding="0" cellspacing="0" class="w-full space-y-2">
        <tr v-for="(item, index) in content" :key="index" class="bg-white">
          <td class="border-b border-black py-4 lg:py-6">
            <span class="text-xs flex justify-between font-semibold pb-3"
              ><span class="">Post #{{ item.volume }}</span
              ><span>{{ item.post_date }}</span></span
            >
            <RouterLink
              class="text-base text-red-900 hover:underline leading-none"
              :to="`/gist?v=${item.volume}`"
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
