<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const title = "Page Not Found";
</script>

<template>
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">
        Oops! Page not found.
      </h1>
      <div class="content space-y-4 mt-4">
        <p>
          The page you are looking for does not exist. It has either been moved
          or deleted.
        </p>
        <p>Please return to the <RouterLink to="/">Home page</RouterLink>.</p>
        <p>Thanks!</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style></style>
