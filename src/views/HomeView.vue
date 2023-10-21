<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import MyGoogleSignIn from "../components/GoogleSignIn.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";
import axios from "axios";
import { useHead } from '@unhead/vue'

// import { decodeCredential } from 'vue3-google-login'


const router = useRouter();
const authStore = useUserStore();

const isloading = ref(true);

const API_URL =
    import.meta.env.VITE_API_URL;

const otherUni = ref(false);

const toggleOtherUni = () => {
    otherUni.value = !otherUni.value;
}

// const userData = ref(null);
// const callback = (response) => {
//     userData.value = decodeCredential(response.credential);
//     registerNow();
// }

// const loginNow = async () => {

//     try {
//         let res = await axios.post(API_URL + "users/login", {
//             username: userData.value.email,
//             password: "1234",
//         });

//         authStore.setUserDetails(res);

//         if (res.data.user.status === 'incomplete') {
//             router.push({
//                 name: "welcome",
//             });
//         } else {
//             router.push({
//                 name: "gist",
//             });

//         }

//     } catch (error) {
//         console.log(error);
//     }
// };


// const registerNow = async () => {
//     try {
//         let res = await axios.post(API_URL + "users/register", {
//             name: userData.value.given_name,
//             username: userData.value.email,
//             campus: "unknown",
//             level: "unknown",
//             password: "1234",
//             user_category: "user",
//             status: "incomplete",
//         });
//         loginNow();
//     } catch (error) {
//         console.log(error)
//     }
// };

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
    title: 'Kampa',
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
    <Loading class="mt-64" v-if="isloading" />
    <div v-else>
        <div class="w-10/12 lg:w-9/12 mx-auto sm:flex sm:space-x-6 lg:space-x-12 mt-10 sm:mt-12 lg:mt-20 xl:mt-20">
            <div class="w-full mx-auto sm:w-7/12 lg:w-8/12 xl:w-8/12 text-left lg:text-left drop-shadow-lg">
                <div class="hidden lg:block">&nbsp;</div>
                <h1 class="mt-1 text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-normal">
                    <span class="font-semibold">Get Informative, Fun, & Relevant Campus Gists.</span><br />Every Saturday.
                </h1>
                <p class="mt-4 text-base sm:text-base">
                    Sign in now to join other students enjoying exclusive content & becoming smarter for FREE!
                </p>
                <p>&nbsp;</p>
                <MyGoogleSignIn/>
                <!--<div class="text-xs mt-4">
                    <span>
                        <b class="text-blue-800">
                            Present in:
                        </b>
                        UNIJOS, UNIABUJA & <span @click="toggleOtherUni" class="border-b border-dotted border-red-600 hover:border-gray-400 hover:text-gra-400 cursor-pointer">3 more</span>.
                    </span>
                </div>-->
            </div>
            <div class="hidden sm:block w-11/12 sm:w-5/12 mx-auto mt-12 lg:w-4/12 xl:w-4/12 sm:-mt-2">
                <div class="px-2 lg:px-1 max-w-full mx-auto h-80 lg:h-96 overflow-hidden drop-shadow-lg">
                    <img src="/kampa.png" class="w-full lg:float-right" />
                </div>
            </div>
        </div>
    </div>
    <div class="mt-8 sm:mt-0 bg-gray-100 border-y border-gray-300 text-sm text-left sm:text-left">
        <div class="w-10/12 lg:w-9/12 mx-auto py-12 lg:py-16">
            <h2 class=" text-sm"><span class="h1 font-semibold text-lg capitalize leading-tight">4 Reasons why you should Sign in & join Kampa now:</span></h2>
            <div class="mt-6 grid grid-cols-1 gap-y-6 sm:gap-0 sm:grid-cols-2">
                <div class="space-y-2 sm:border-r sm:border-b sm:border-black sm:pt-4 sm:pr-4">
                    <h4><span class="mx-0 sm:mx-0 bg-black block w-6 h-6 text-white text-center pt-0.5 rounded-bl-lg rounded-tr-lg">1</span></h4>
                    <h3 class="font-semibold">Exclusive Gists</h3>
                    <p class="text-left">Every Saturday we post exclusive interview excerpts, localised news,
                        and more to keep you well informed.</p>
                    <p>Just what you'll need to relax through the weekend.</p>
                </div>
                <div class="space-y-2 border-y sm:border-y-0 sm:border-b border-black sm:pl-4 pb-4 pt-4">
                    <h4><span class="mx-0 sm:mx-0 bg-black block w-6 h-6 text-white text-center pt-0.5 rounded-bl-lg rounded-tr-lg">2</span></h4>
                    <h3 class="font-semibold">Give-aways & Discounts</h3>
                    <p class="text-left">What will an extra 10K do for you? How about a 50% discount on Transport fare back home at semester end? </p>
                    <p class="text-left">You'll get access to such give-aways and discounts every now & then.</p>
                </div>
                <div class="space-y-2 pb-4 sm:pb-0 sm:pt-4 sm:pr-4 border-b sm:border-b-0 sm:border-r border-black">
                    <h4><span class="mx-0 sm:mx-0 bg-black block w-6 h-6 text-white text-center pt-0.5 rounded-bl-lg rounded-tr-lg">3</span></h4>
                    <h3 class="font-semibold">It'll make you Smarter</h3>
                    <p class="text-left">Keep getting smarter and stay ahead of the game with our curation of relevant news, plus the excellent career ideas & resources we share in the "Graduate Well" and "Free Resource" sections.</p>
                    <p class="text-left">You'll love it!</p>
                </div>
                <div class="space-y-2 sm:p-4">
                    <h4><span class="mx-0 sm:mx-0 bg-black block w-6 h-6 text-white text-center pt-0.5 rounded-bl-lg rounded-tr-lg">4</span></h4>
                    <h3 class="font-semibold">It's FREE</h3>
                    <p class="text-left">You don't have to pay to sign in even though what you'll be getting every Saturday is worth a few thousands of naira.</p>
                    <p class="text-left">Sign in to join and see for yourself.</p>
                    <p class="text-left">😎</p>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-10 w-10/12 lg:w-9/12 mx-auto p-2 sm:p-10 border border-black space-y-4 sm:text-xl">
        <h2><span class="text-xl">✌🏿</span></h2>
        <div class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6">
            <p class="grow">
                Kampa informs and helps Nigerian Uni students become smarter by curating and creating relevant, fun & localised content for students to enjoy.
            </p>
            <div>
                <MyGoogleSignIn/>
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