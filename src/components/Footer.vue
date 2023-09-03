<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user-store";
import { RouterLink, useRouter } from "vue-router";
import ComingSoon from "../components/ComingSoon.vue";
const router = useRouter();

const authStore = useUserStore();

const logout = () => {
    authStore.clearUser();
    router.push({ name: "home" });
};

const showForm = ref(false);

const doShowForm = (which) => {
    showForm.value = !showForm.value;
};

const closeForm = () => {
    showForm.value = !showForm.value;
};
</script>
<template>
    <ComingSoon v-if="showForm" @close-form="closeForm" />
    <footer class="py-10 mt-0 border-t border-gray-400 text-xs sm:text-xs text-black">
        <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
            <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <img @click="doShowForm" src="/play-store.png" class="h-10 hover:opacity-60" />
                <img @click="doShowForm" src="/app-store.png" class="h-10 hover:opacity-60" />
            </div>
            <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 sm:pt-2">
                <div>
                    <a href="https://wa.me/23408187084716" target="_blank" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        0818 708 4716
                    </a>
                </div>
                <div>
                    <RouterLink to="/disclaimer" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Disclaimer
                    </RouterLink>
                </div>
                <span v-if="authStore.cid" @click="logout" class="border-b border-red-600 hover:opacity-60 cursor-pointer">Logout</span>
                <span>&copy; {{ new Date().getFullYear() }}. All rights reserved.</span>
            </div>
        </div>
    </footer>
</template>