<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ChangePhone from "../components/ChangePhone.vue";

import { useVuelidate } from "@vuelidate/core";
import {
    required,
    maxLength,
    minLength,
    helpers
} from "@vuelidate/validators";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useUserStore();

const errorMessage = ref(null);

const isProcessing = ref(false);

const formData = ref({
    campus: "",
    level: "",
});


const rules = {
    campus: {
        required: helpers.withMessage("*Required", required),
    },
    level: {
        required: helpers.withMessage("*Required", required),
    },
};

const v$ = useVuelidate(rules, formData);

const API_URL =
    import.meta.env.VITE_API_URL;

const submitForm = async () => {

    isProcessing.value = true;

    axios.patch(
            API_URL + "users/" + authStore.cid, {
                campus: formData.value.campus,
                level: formData.value.level,
                status: 'complete',
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            router.push({
                name: "referredby",
            });
        })
        .catch((error) => {
            console.log(error);
        });

};


onMounted(async () => {
    if (!authStore.cid) {

        router.push({
            name: "home",
        });

    }
});
</script>
<template>
    <Header />
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-5/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Welcome!</h1>
            <div class="sm:pt-0">
                <p>Hi, so excited to have you. </p> <p>My name is Moses, creator of Kampa Newsletter.</p>
                <p>I created Kampa to help you stay informed, entertained and become smarter.</p>
                <p>Pls sharply answer these 2 quick questions so you can delve in:</p>
                <form @submit.prevent="submitForm" class="space-y-4">
                    <div class="grid grid-cols-2 gap-2 sm:gap-4">
                        <div>
                            <select v-model="formData.campus" @blur="v$.campus.$touch" class="bg-white border border-black h-12 p-1 w-full outline-none disabled:text-red-600" required>
                                <option value="" disabled selected>Your University?</option>
                                <option value="UNIJOS">UNIJOS</option>
                                <option value="KASU">KASU</option>
                                <option value="UNIABUJA">UNIABUJA</option>
                                <option value="ABU">ABU</option>
                            </select>
                        </div>
                        <div>
                            <select v-model="formData.level" @blur="v$.level.$touch" class="bg-white border border-black h-12 p-1 w-full outline-none disabled:text-red-600" required>
                                <option value="" disabled selected>Your Level?</option>
                                <option value="100">100 Level</option>
                                <option value="200">200 Level</option>
                                <option value="300">300 Level</option>
                                <option value="400">400 Level</option>
                                <option value="500">500 Level</option>
                                <option value="600">600 Level</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button v-if="v$.$invalid" disabled class="h-12 capitalise w-full bg-black cursor-not-allowed p-3 text-white">
                            Continue
                        </button>
                        <span v-else>
                            <button v-if="isProcessing" disabled class="h-12 w-full bg-orange-400 shadow-lg cursor-not-allowed animate-pulse p-3 opacity-60 text-white">
                                Processing.. .
                            </button>
                            <button v-else class="h-12 w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white">
                                Continue
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Footer />
</template>
<style lang="css" scoped>
select:invalid {
    color: rgb(156 163 175) !important;
}
</style>