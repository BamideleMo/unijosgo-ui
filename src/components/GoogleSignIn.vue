<script setup>
import { ref, onMounted } from "vue";

import { decodeCredential } from 'vue3-google-login';

const API_URL =
    import.meta.env.VITE_API_URL;


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
</script>
<template>
    <GoogleLogin :callback="callback" class="border-2 border-red-600 rounded hover:opacity-60 drop-shadow-lg bg-red-600" />
</template>