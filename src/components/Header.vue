<script setup>
import { useUserStore } from "../store/user-store";
import Logo from "./Logo.vue";

const authStore = useUserStore();
</script>
<template>
  <div class="bg-white border-b shadow-lg py-2">
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
      <Logo />
      <div class="pt-3 sm:pt-3 drop-shadow-lg">
        <RouterLink
          v-if="authStore.cid"
          to="/archive"
          class="text-black text-sm hover:opacity-60"
          >All Gists</RouterLink
        >
        <RouterLink
          v-else
          to="/about"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >About</RouterLink
        >
      </div>
    </div>
  </div>
</template>
