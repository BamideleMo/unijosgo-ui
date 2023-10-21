<script setup>
    import { ref, onMounted } from "vue";
    import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../store/user-store";
import axios from "axios";
import {
    required,
    helpers,
    minLength,
    maxLength
} from "@vuelidate/validators";

const authStore = useUserStore();


const isProcessing = ref(false);

const errorMessage = ref(null);


const formData = ref({
    referrer: "",
});


const currentMonth = ref(null);
const currentYear = ref(null);
const getMonthYear = () => {
    var mnt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth.value = mnt[new Date().getMonth()];
    currentYear.value = new Date().getFullYear();
}


const rules = {
    referrer: {
        required: helpers.withMessage("*Required", required),
        minLength: helpers.withMessage("*Invalid", minLength(5)),
        maxLength: helpers.withMessage("*Invalid", maxLength(5)),
    },
};


const v$ = useVuelidate(rules, formData);

const API_URL =
    import.meta.env.VITE_API_URL;

const submitForm = async () => {

    isProcessing.value = true;

    if (formData.value.referrer === authStore.cid) {
        isProcessing.value = false;
        errorMessage.value = "You can not refer yourself.";
    } else {

        axios
            .get(
                API_URL + "users/" + formData.value.referrer, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.data) {
                    createReferrer();
                } else {
                    isProcessing.value = false;
                    errorMessage.value = "User with Unique Referral Code: " +formData.value.referrer + " does not exist. Check & retry.";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

const showDone = ref(false);
const createReferrer = () => {
    axios
        .post(
            API_URL + "referrerlogs", {
                referred_by: formData.value.referrer,
                subscriber: authStore.username,
                month: currentMonth.value,
                year: currentYear.value,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            showDone.value = true;
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>
<template>
    <div class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <div class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-5 sm:p-10 rounded-lg">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    Submit Referrer's Unique Referral Code
                </h1>
                <svg @click="$emit('closeForm')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="text-black text-sm space-y-4 pt-4">
                <div v-if="showDone">
                    <p>Done! Just close to continue.</p>
                    <p>Thank you.</p>
                </div>
                <form v-else @submit.prevent="submitForm" class="space-y-4">
                    <div>
                        <input type="text" v-model="formData.referrer" @blur="v$.referrer.$touch" @keydown.space.prevent placeholder="Type Referrer's Unique Referral Code here..." class="bg-white placeholder:text-gray-400 border border-black h-12 p-1 w-full outline-none disabled:text-red-600" />
                        <div class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs" v-if="v$.referrer.$error">
                            <span class="w-16 float-right -mt-9 mr-2 text-xs">
                                <span>{{ v$.referrer.$errors[0].$message }}</span></span>
                        </div>
                    </div>
                    <div v-if="errorMessage" class="bg-black animate-pulse text-white text-xs p-2 mt-2 border-l-4 border-purple-900">
                        {{ errorMessage }}
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <button @click="skip" class="w-full bg-blue-900 shadow-lg p-3 hover:opacity-60 text-white rounded-lg">
                                Skip for Now
                            </button>
                        </div>
                        <div>
                            <button v-if="v$.$invalid" disabled class="w-full bg-gray-400 shadow-lg cursor-not-allowed p-3 opacity-60 text-white rounded-lg">
                                Submit
                            </button>
                            <span v-else>
                                <button v-if="isProcessing" disabled class="w-full bg-orange-400 shadow-lg cursor-not-allowed p-3 animate-pulse opacity-60 text-white rounded-lg">
                                    Processing.. .
                                </button>
                                <button v-else class="w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white rounded-lg">
                                    Submit
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>