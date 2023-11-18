<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import MyGoogleSignIn from "../components/GoogleSignIn.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";
import axios from "axios";
import { useHead } from "@unhead/vue";

// import { decodeCredential } from 'vue3-google-login'

const router = useRouter();
const authStore = useUserStore();

const isloading = ref(true);

const API_URL = import.meta.env.VITE_API_URL;

const otherUni = ref(false);

const toggleOtherUni = () => {
  otherUni.value = !otherUni.value;
};

onMounted(async () => {
  if (authStore.cid) {
    router.push({
      name: "gist",
    });
  } else {
    isloading.value = false;
  }
});

useHead({
  title: "Kampa",
  meta: [
    {
      name: "description",
      content: `A weekly online newsletter for Nigerian Uni students. It's the modern campus magazine
                that provides the best social content that's focused on Nigerian Universities for readers to
                enjoy.`,
    },
  ],
});
</script>
<template>
  <div
    class="w-screen h-screen top-0 fixed bg-black bg-opacity-90 z-50"
    v-if="otherUni"
  >
    <div
      class="bg-white rounded-lg w-10/12 sm:w-5/12 lg:w-1/2 mx-auto mt-20 p-4 space-y-6"
    >
      <div class="flex justify-between border-b border-black">
        <h1 class="h1 font-semibold text-lg">🤩</h1>
        <svg
          @click="toggleOtherUni"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p>Kampa Newsletter is also present in:</p>
      <ol class="list-disc px-10">
        <li>KASU</li>
        <li>ABU</li>
        <li>FULafia</li>
      </ol>
      <p>Will spread to more universities very soon!</p>
    </div>
  </div>
  <Header />
  <Loading v-if="isloading" />
  <div v-else>
    <div
      class="w-10/12 lg:w-9/12 mx-auto lg:flex lg:space-x-12 mt-10 sm:mt-12 lg:mt-20 xl:mt-20"
    >
      <div
        class="pb-12 w-full mx-auto lg:w-8/12 xl:w-8/12 text-left lg:text-left drop-shadow-lg"
      >
        <div class="hidden lg:block">&nbsp;</div>
        <h1
          class="mt-1 text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-normal"
        >
          <span class="font-semibold"
            >Get Informative, Fun, & Relevant <span>Campus Gists</span>.</span
          ><br />Every Saturday.
        </h1>
        <p class="mt-4 text-base sm:text-base">
          Sign in now to join other students who are enjoying exclusive content
          & becoming smarter for FREE!
        </p>
        <p>&nbsp;</p>
        <MyGoogleSignIn />
      </div>
      <div
        class="hidden lg:block w-11/12 mx-auto mt-12 lg:w-4/12 xl:w-4/12 sm:-mt-2"
      >
        <div
          class="px-2 lg:px-1 max-w-full mx-auto h-80 lg:h-96 overflow-hidden drop-shadow-lg"
        >
          <img src="/kampa.png" class="w-full lg:float-right" />
        </div>
      </div>
    </div>
  </div>

  <div class="bg-black py-4 lg:pt-6 lg:pb-16">
    <h1 class="mt-6 h1 font-semibold text-lg text-center">
      What Readers Said:
    </h1>
    <div class="w-10/12 lg:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3">
      <img src="/testimonial-1.png" class="w-full sm:w-3/5 mx-auto lg:w-full" />
      <img src="/testimonial-2.png" class="w-full sm:w-3/5 mx-auto lg:w-full" />
      <img src="/testimonial-3.png" class="w-full sm:w-3/5 mx-auto lg:w-full" />
    </div>
  </div>
  <div
    class="mt-20 w-10/12 lg:w-9/12 mx-auto p-2 sm:p-10 border border-black space-y-4 sm:text-xl"
  >
    <h2><span class="text-xl">✌🏿</span></h2>
    <div class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6">
      <p class="grow">
        Kampa informs and helps Nigerian Uni students become smarter by curating
        and creating relevant, fun & localised content for students to enjoy.
      </p>
      <div>
        <MyGoogleSignIn />
      </div>
    </div>
  </div>
  <Footer />
</template>
<style scoped></style>
