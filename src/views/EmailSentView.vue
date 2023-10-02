<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";


const authStore = useUserStore();


const API_URL =
    import.meta.env.VITE_API_URL;


const resent = ref(false);

const sendLink = () =>{
    console.log(authStore.username)
    axios
        .post(
            API_URL + "email/" + authStore.username + "/" + authStore.cid, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            resent.value = true;
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>
<template>
    <Header />
    <div v-if="recent">x</div>
    <div v-else class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Great! </h1>
                <div class="sm:pt-0">
                    <p>
                        We've sent a confirmation link to: <b>{{authStore.username}}</b>.
                    </p>
                    <p>
                        Now check your email inbox and click on the link to confirm you are for real 😃.
                    </p>
                    <p>
                        If you can't find it in your email inbox try these:
                    </p>
                    <ol>
                        <li>Refresh your inbox & wait for about 5 mins.</li>
                        <li>Check your SPAM folder.</li>
                        <li>Resend email. <span @click="sendLink" class="text-red-600 hover:opacity-60 border-b border-black">Click here</span></li>
                        <li>
                            Get confirmation via WhatsApp chat: <a class="text-red-600 hover:opacity-60" href="https://wa.me/23408187084716?text=Hi,%20I%20want%20Kampa%20confirmation." target="_blank">Click here</a>
                        </li>
                    </ol>
                </div>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>