<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LoginForm from "../components/LoginForm.vue";
import Loading from "../components/Loading.vue";
import SubscribeForm from "../components/SubscribeForm.vue";
import Available from "../components/Available.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();

const API_URL =
    import.meta.env.VITE_API_URL;

const showForm = ref(false);
const whichForm = ref(null);
const isloading = ref(true);

const doShowForm = (which) => {
    showForm.value = !showForm.value;
    whichForm.value = which;
};

const closeForm = () => {
    showForm.value = !showForm.value;
};

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
    <div v-if="showForm" class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <SubscribeForm v-if="whichForm === 'subscribe'" @close-form="closeForm" />
        <LoginForm v-else @close-form="closeForm" />
    </div>
    <Header />
    <Loading v-if="isloading" />
    <div v-else class="w-11/12 lg:w-9/12 mx-auto lg:flex lg:space-x-12 mt-10 lg:mt-20 xl:mt-20">
        <div class="w-11/12 mx-auto lg:w-8/12 xl:w-8/12 text-center lg:text-left drop-shadow-lg">
            <h1 class="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Get Smarter with 20-mins of Localised <span class="border-b border-red-600">Campus Gists</span> Published Every Saturday.
            </h1>
            <p class="mt-4 text-sm sm:text-base">
                Join 650+ students and get localised campus news, interviews, opinions & more
                to help you become smarter + stay well informed!
            </p>
            <div class="mt-6 space-x-4" id="subscribe">
                <span @click="doShowForm('subscribe')" class="shadow-lg border border-black text-white bg-black text-sm py-3 px-3 hover:opacity-40 cursor-pointer">
                    Subscribe for FREE
                </span>
                <span @click="doShowForm('login')" class="shadow-lg border border-black text-black text-sm py-3 px-3 hover:opacity-40 cursor-pointer">Login</span>
            </div>
            <div class="text-xs mt-6">
                <Available />
            </div>
        </div>
        <div class="w-11/12 sm:w-6/12 mx-auto mt-12 lg:w-4/12 xl:w-4/12 lg:-mt-6">
            <div class="px-2 lg:px-1 w-full mx-auto max-h-96 border-b-4 border-gray-400 overflow-hidden drop-shadow-lg">
                <img src="/kampa-mobile.png" class="w-full lg:float-right" />
            </div>
        </div>
    </div>
    <Footer />
</template>