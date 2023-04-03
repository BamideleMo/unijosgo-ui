<script setup>
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const logout = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    let res = await axios.post(API_URL + "logout", "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    userStore.clearUser();

    router.push({
      name: "signin",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    class="drop-shadow-lg w-11/12 sm:w-6/12 mx-auto border border-gray-200 p-3 sm:p-6 rounded-xl my-6 sm:my-8 bg-white"
  >
    <header class="pt-4 sm:pt-8">
      <div class="pb-4">
        <div class="mb-6 text-center drop-shadow-lg">
          <RouterLink to="/" class="text-4xl font-extrabold">
            <span class="text-black">UniJos</span><span class="gist">Gist</span>
          </RouterLink>
          <div class="-mt-2 text-gray-700">www.unijosgist.ng</div>
        </div>

        <hr />
      </div>
    </header>

    <div class="mb-10">
      <RouterView />
    </div>

    <footer
      class="mt-20 border-t border-gray-700 py-6 text-center text-xs sm:text-sm text-black"
    >
      <div class="text-center space-x-6">
        <RouterLink to="/" class="border-b border-green-400 hover:opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3 inline"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </RouterLink>
        <RouterLink
          v-if="userStore.role === 'admin'"
          to="/admin/post"
          class="border-b border-green-400 hover:opacity-60"
          >Post
        </RouterLink>
        <span v-if="!userStore.uuser_id" class="space-x-6">
          <RouterLink
            to="/subscribe"
            class="border-b border-green-400 hover:opacity-60"
            >Subscribe</RouterLink
          >
          <RouterLink
            to="/sign-in"
            class="border-b border-green-400 hover:opacity-60"
            >Sign In</RouterLink
          >
        </span>
        <RouterLink
          to="/about"
          class="border-b border-green-400 hover:opacity-60"
          >About</RouterLink
        >
        <span
          v-if="userStore.uuser_id"
          @click="logout"
          class="border-b border-green-400 hover:opacity-60 cursor-pointer"
          >Logout</span
        >
      </div>
      <div class="mt-6 text-gray-400">&copy; 2023. All rights reserved.</div>
    </footer>
  </div>
</template>

<style scoped></style>
