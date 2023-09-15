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
            <h2 class="text-blue-900">A Student in Nigerian University?</h2>
            <h1 class="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Get Smarter with 15-mins of Fun Gists Every Saturday.
            </h1>
            <p class="mt-4 text-sm sm:text-base">
                Hi, this is Kampa, an online weekly newsletter of localised campus news, spotlights, opinions & more
                to help you be smarter + stay well informed!
            </p>
            <p class="text-xs mt-4 text-red-600 font-semibold">
                <b class="text-black">*</b> Over 501 students have already subscribed.
            </p>
            <div class="mt-6 space-x-4" id="subscribe">
                <span @click="doShowForm('subscribe')" class="shadow-lg border border-black text-white bg-red-600 text-sm py-3 px-3 hover:opacity-40 cursor-pointer">
                    Subscribe for FREE
                </span>
                <span @click="doShowForm('login')" class="shadow-lg border border-red-600 text-black text-sm py-3 px-3 hover:opacity-40 cursor-pointer">Login</span>
            </div>
            <div class="text-xs mt-6">
                <Available />
            </div>
        </div>
        <div class="w-11/12 sm:w-6/12 mx-auto mt-6 lg:w-4/12 xl:w-4/12 lg:-mt-6">
            <div class="lg:px-1 max-h-96 border-b-4 border-black overflow-hidden">
                <img src="/kampa-mobile.png" class=" mx-auto lg:mx-0 lg:float-right" />
            </div>
        </div>
    </div>
    <Footer />
</template>