<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";
import axios from "axios";
import {useHead} from '@unhead/vue'

import { decodeCredential } from 'vue3-google-login'


const router = useRouter();
const authStore = useUserStore();

const isloading = ref(true);

const API_URL =
    import.meta.env.VITE_API_URL;

const otherUni = ref(false);

const toggleOtherUni = () => {
    otherUni.value = !otherUni.value;
}

const userData = ref(null);
const callback = (response) => {
    userData.value = decodeCredential(response.credential);
    registerNow();
}


const loginNow = async () => {

    try {
        let res = await axios.post(API_URL + "users/login", {
            username: userData.value.email,
            password: "1234",
        });

        authStore.setUserDetails(res);

        if (res.data.user.status === 'incomplete') {
            router.push({
                name: "welcome",
            });
        } else {
            router.push({
                name: "gist",
            });

        }

    } catch (error) {
        console.log(error);
    }
};


const registerNow = async () => {
    try {
        let res = await axios.post(API_URL + "users/register", {
            name: userData.value.given_name,
            username: userData.value.email,
            campus: "unknown",
            level: "unknown",
            password: "1234",
            user_category: "user",
            status: "incomplete",
        });
        loginNow();
    } catch (error) {
        console.log(error)
    }
};

onMounted(async () => {
    if (authStore.cid) {
        router.push({
            name: "gist",
        });
    } else {
        isloading.value = false;
    }
});

useHead({
    title: 'Kampa Newsletter',
    meta: [{
        name: 'description',
        content: `A weekly online newsletter for Nigerian Uni students. It's the modern campus magazine
                that provides the best social content that's focused on Nigerian Universities for readers to
                enjoy.`
    }]
})
</script>
<template>
    <div class="w-screen h-screen top-0 fixed bg-black bg-opacity-90 z-50" v-if="otherUni">
        <div class="bg-white rounded-lg w-10/12 sm:w-5/12 lg:w-1/2 mx-auto mt-20 p-4 space-y-6">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    🤩
                </h1>
                <svg @click="toggleOtherUni" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <p>Kampa Newsletter is also present in:</p>
            <ol class="list-disc px-10">
                <li>KASU</li>
                <li>ABU</li>
                <li>FULafia</li>
            </ol>
            <p>
                Will spread to more universities very soon!
            </p>
        </div>
    </div>
    <Header />
    <Loading v-if="isloading" />
    <div v-else>
        <div class="w-11/12 lg:w-9/12 mx-auto lg:flex lg:space-x-12 mt-10 lg:mt-10 xl:mt-10">
            <div class="w-full mx-auto lg:w-8/12 xl:w-8/12 text-left lg:text-left drop-shadow-lg">
                <img src="/smile_wave_black_lg.png" class="w-12 lg:w-12" />
                <h1 class="mt-1 text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-normal">
                    <span class="font-semibold">Get Informative, Fun, & Relevant Campus Gists.</span><br />Every Saturday.
                </h1>
                <p class="mt-4 text-base sm:text-base">
                    Sign in to join 1,650+ students enjoying localised campus news, interviews, opinions,
                    freebies & exclusive discounts every Saturday.
                </p>
                <GoogleLogin :callback="callback" class="mt-6 border-2 border-red-600 rounded hover:opacity-60 drop-shadow-lg bg-red-600" />
                <div class="text-xs mt-6">
                    <span>
                        <b class="text-blue-800">
                            Present in:
                        </b>
                        UNIJOS, UNIABUJA & <span @click="toggleOtherUni" class="border-b border-dotted border-red-600 hover:border-gray-400 hover:text-gra-400 cursor-pointer">3 Other Unis</span>.
                    </span>
                </div>
            </div>
            <div class="w-11/12 sm:w-6/12 mx-auto mt-12 lg:w-4/12 xl:w-4/12 lg:-mt-2">
                <div class="px-2 lg:px-1 max-w-full mx-auto h-96 overflow-hidden drop-shadow-lg">
                    <img src="/kampa.png" class="w-full lg:float-right" />
                </div>
            </div>
        </div>
    </div>
    <div class="bg-gray-100 border-y text-xs">
        <div class="w-11/12 lg:w-9/12 mx-auto py-12">
            <h2 class="text-left text-sm">Wondering why you should subscribe? Here are 3 Reasons...</h2>
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                <div class="space-y-2">
                    <h4><span class="bg-red-600 block w-6 h-6 text-white rounded-full text-center pt-1">1</span></h4>
                    <h3 class="font-semibold">Exclusive Content + Give-aways</h3>
                    <p>What will an extra 10K do for you? How about a 50% discount on TP back home at semester end? Now... our 
                    subscribers get to enjoy such give-aways along with exclusive content.</p>
                </div>
                <div class="space-y-2">
                    <h4><span class="bg-red-600 block w-6 h-6 text-white rounded-full text-center pt-1">2</span></h4>
                    <h3 class="font-semibold">You'll Become Smarter</h3>
                    <p>With our curation of top 5 national news & the excellent career ideas (in the #GraduateWell section) that we post, you will definitely get smarter and stay ahead of the game.</p>
                </div>
                <div class="space-y-2">
                    <h4><span class="bg-red-600 block w-6 h-6 text-white rounded-full text-center pt-1">3</span></h4>
                    <h3 class="font-semibold">It's Totally FREE</h3>
                    <p>You don't have to pay anything to subscribe even though what you'll be getting is worth thousands of naira.</p>
                    <p>Sign in and see for yourself.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="w-11/12 lg:w-9/12 mx-auto py-12 flex space-x-2 sm:space-x-6">
        <div class="w-16 sm:w-20">
            <img src="/quote-kampa-newsletter.png" class="w-full"/>
            <div class="uppercase text-base rotate-90">Testimonial</div>
        </div>
        <div class="grow space-y-3 pt-4 sm:pt-6">
            <h2 class="text-xl sm:text-2xl">Excellent work love it!</h2>
            <p class="text-xs">- Franca (400L Student)</p>
        </div>
    </div>
    <Footer />
</template>
<style>
:selected {
    color: red;
}
</style>