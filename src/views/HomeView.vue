<script setup>
import { ref } from "vue";
import SuperMeta from "../components/SuperMeta.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LoginForm from "../components/LoginForm.vue";
import SubscribeForm from "../components/SubscribeForm.vue";

const showForm = ref(false);
const whichForm = ref(null);

const doShowForm = (which) => {
  showForm.value = !showForm.value;
  whichForm.value = which;
};

const closeForm = () => {
  showForm.value = !showForm.value;
};

const title = "UniJosGo - Fun & Informative";
</script>
<template>
  <SuperMeta
    :title="title"
    name="description"
    content="Welcome to the weekly online publication of fun gists for all Jossites 
    about Jossites!"
  />
  <div
    v-if="showForm"
    class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80"
  >
    <SubscribeForm v-if="whichForm === 'subscribe'" @close-form="closeForm" />
    <LoginForm v-else @close-form="closeForm" />
  </div>
  <Header />
  <div
    class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto lg:flex lg:space-x-12 mt-10 lg:mt-20"
  >
    <div class="lg:w-8/12 text-center lg:text-left drop-shadow-lg">
      <h1 class="lg:pt-4 text-2xl sm:text-4xl font-bold leading-tight">
        Spotlights, Social Life, <br />
        Opinions, & Fun Gists for<br />
        UniJos Students.
      </h1>
      <p class="mt-4 text-lg sm:text-lg">
        Hi, this is UniJosGo, a weekly online publication of fun gist for &
        about students in UniJos!
      </p>
      <p class="text-xs mt-4 text-blue-800 font-semibold">
        <b class="text-black">*</b> Subscribe or Login to read our latest gists.
      </p>
      <div class="mt-6 space-x-4" id="subscribe">
        <span
          @click="doShowForm('subscribe')"
          class="shadow-lg border border-red-600 text-black text-sm py-3 px-3 hover:opacity-40 cursor-pointer"
          >Subscribe</span
        >
        <span
          @click="doShowForm('login')"
          class="shadow-lg border border-red-600 text-black text-sm py-3 px-3 hover:opacity-40 cursor-pointer"
          >Login</span
        >
      </div>
    </div>
    <div class="w-11/12 sm:w-8/12 mx-auto mt-12 lg:w-4/12 lg:-mt-8">
      <div class="lg:px-0">
        <img
          src="/mobile.png"
          class="max-w-80 mx-auto lg:mx-0 lg:float-right"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>
