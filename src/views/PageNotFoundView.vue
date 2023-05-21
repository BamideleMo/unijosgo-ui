<script setup>
import SuperMeta from "../components/SuperMeta.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const title = "Page Not Found";
</script>

<template>
  <SuperMeta
    :title="title"
    name="description"
    content="Oops! The page you are looking for has been moved or deleted."
  />
  <Header />
  <div class="">
    <h1 class="h1 font-semibold text-lg">Oops! Page Not Found</h1>
    <div class="content space-y-4 mt-4">
      <p>
        The page you are looking for does not exist. It has either been moved or
        deleted.
      </p>
      <p>Please return to the <RouterLink to="/">Home page</RouterLink>.</p>
      <p>Thanks!</p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
