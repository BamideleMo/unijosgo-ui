<script setup>
import { ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LoginForm from "../components/LoginForm.vue";

const showForm = ref(false);

const doShowForm = () => {
  showForm.value = !showForm.value;
};

const closeForm = () => {
  showForm.value = !showForm.value;
};

const title = "Welcome";
</script>
<template>
  <Header />
  <div
    v-if="showForm"
    class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80"
  >
    <LoginForm @close-form="closeForm" />
  </div>
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">
        Hi there 👋. Welcome!
      </h1>
      <div class="flex flex-col sm:flex-row space-x-10">
        <div class="sm:pt-0">
          <img
            src="/jet.png"
            alt=""
            class="shadow-none w-60 sm:w-80 rounded mx-auto p-3"
          />
        </div>
        <div class="grow text-left sm:text-left text-black">
          <div class="mt-6 space-y-3">
            <p>
              Glad to have you aboard. Here's what to expect
              <b>Every Friday</b>:
            </p>
            <p>
              <b
                >We'll post 6 or more informative, fun and helpful gists for
                your reading pleasure.</b
              >
            </p>
            <p>
              <span
                @click="doShowForm"
                class="font-semibold text-red-600 hover:opacity-60 cursor-pointer"
                >Log in now</span
              >... Let's fly!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style lang="scss" scoped></style>
