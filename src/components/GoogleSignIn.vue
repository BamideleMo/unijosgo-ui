<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { decodeCredential } from 'vue3-google-login';
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store";

const router = useRouter();
const authStore = useUserStore();

const API_URL =
    import.meta.env.VITE_API_URL;


const isProcessing = ref(false);

const userData = ref(null);
const callback = (response) => {
    userData.value = decodeCredential(response.credential);
    registerNow();
    isProcessing.value = true;
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
</script>
<template>
    <span v-if="isProcessing" class="border-2 border-red-600 rounded hover:opacity-60 drop-shadow-lg bg-white py-4 px-6 text-xs animate-pulse ">Signing in ...</span>
    <GoogleLogin :callback="callback" v-else class="border-2 border-red-600 rounded hover:opacity-60 drop-shadow-lg bg-red-600" />
</template>