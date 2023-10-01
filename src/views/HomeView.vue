<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import Available from "../components/Available.vue";
import UserAccess from "../components/UserAccess.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();

const isloading = ref(true);

const API_URL =
    import.meta.env.VITE_API_URL;

onMounted(async () => {
    if (userStore.cid) {
        router.push({
            name: "gist",
        });
    } else {
        isloading.value = false;
    }
});
</script>
<template>
    <Header />
    <Loading v-if="isloading" />
    <div v-else class="w-11/12 lg:w-9/12 mx-auto lg:flex lg:space-x-12 mt-10 lg:mt-20 xl:mt-20">
        <div class="w-full mx-auto lg:w-8/12 xl:w-8/12 text-left lg:text-left drop-shadow-lg">
            <img src="/smile_wave_black_lg.png" class="w-12 lg:w-12"/>
            <h1 class="mt-1 text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-normal">
                <span class="font-semibold">Get Informative, Fun, & Relevant Campus Gists.</span><br />Every Saturday.
            </h1>
            <p class="mt-4 text-base sm:text-base">
                Join 650+ students and get localised campus news, interviews, opinions,
                freebies and exclusive discounts every Saturday.
            </p>
            <div class="text-xs mt-6">
                <Available />
            </div>
            <UserAccess class="w-full lg:pr-3"/>
        </div>
        <div class="w-11/12 sm:w-6/12 mx-auto mt-12 lg:w-4/12 xl:w-4/12 lg:-mt-6">
            <div class="px-2 lg:px-1 max-w-full mx-auto h-96 border-b-4 border-gray-400 overflow-hidden drop-shadow-lg">
                <img src="/kampa.png" class="w-full lg:float-right" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<style>
:selected {
    color: red;
}
</style>
