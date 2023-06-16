<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";

const authStore = useUserStore();
const router = useRouter();

const goStart = () => {
  if (authStore.cid) {
    router.push({
      name: "gist",
    });
  } else {
    router.push({
      name: "home",
    });
  }
};
</script>
<template>
  <div @click="goStart" class="cursor-pointer drop-shadow-lg">
    <span class="text-3xl font-extrabold hover:opacity-60">
      <span class="text-black">UniJos</span><span class="myred">Gö</span>
    </span>
    <div class="-mt-1 text-gray-600 text-xs">
      <span class="hover:opacity-60">www.unijosgo.ng</span>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
