<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">Verify Email</h1>
      <p>Hi there.</p>
      <p>
        A verification email with <b>verification code</b> has been sent to:
        <b class="text-blue-900">{{ route.query.e }}</b>
      </p>
      <p>Enter the verification code in the box below and click on 'Verify':</p>
      <div class="flex text-xs">
        <input
          type="text"
          placeholder="Enter Verification Code here"
          class="shadow-lg p-2 border border-blue-800 bg-transparent grow"
        /><button class="bg-blue-900 text-white p-3 hover:bg-blue-800">
          Verify
        </button>
      </div>
      <p>
        <b>PS:</b><br />
        If you can't find the verification email in your inbox please check your
        SPAM folder or check under "Promotions".
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
