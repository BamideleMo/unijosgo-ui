<script setup>
// import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
// import Header from "./components/Header.vue";
// import Footer from "./components/Footer.vue";

const router = useRouter();
</script>

<template>
  <main class="">
    <RouterView />
  </main>
</template>

<style scoped></style>
