<script setup>
import { ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LoginForm from "../components/LoginForm.vue";


const showForm = ref(false);

const doShowForm = () =>{
  showForm.value = !showForm.value;
}
const closeForm = () => {
    showForm.value = !showForm.value;
};
</script>

<template>
<div v-if="showForm" class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <LoginForm @close-form="closeForm" />
    </div>
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">Changed Phone Number</h1>
      <p>
        Your phone number has been changed.
      </p>
      <p>
        Login using the new phone number to continue.
      </p>
      <p>
        <span class="text-red-600 hover:opacity-60 cursor-pointer" @click="doShowForm">Click here to Login</span>.
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
