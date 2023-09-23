<script setup>
    import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import {
    required,
    maxLength,
    minLength,
    helpers
} from "@vuelidate/validators";

const router = useRouter();

const authStore = useUserStore();


const isProcessing = ref(false);

const errorMessage = ref(null);


const formData = ref({
    referrer: "",
});

const mustBeNgphone = helpers.regex(/^[0][0-9]+$/);


const rules = {
    referrer: {
        required: helpers.withMessage("*Required", required),
        minLength: helpers.withMessage("*Invalid", minLength(11)),
        maxLength: helpers.withMessage("*Invalid", maxLength(11)),
        mustBeNgphone: helpers.withMessage("*Invalid", mustBeNgphone),
    },
};


const v$ = useVuelidate(rules, formData);

const API_URL =
    import.meta.env.VITE_API_URL;

const submitForm = async () => {

    isProcessing.value = true;

    if (formData.value.referrer === authStore.username) {
        isProcessing.value = false;
        errorMessage.value = "You can not refer yourself.";
    } else {

        axios
            .get(
                API_URL + "users/other/" + formData.value.referrer, {
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
                    errorMessage.value = formData.value.referrer + " is not Subscribed. Check & retry.";
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

const skip = () => {

    router.push({
        name: "gist",
    });

}


const hasReferrer = ref(false);
const isLoading = ref(true);
const getReferrer = () => {
    axios.get(
                API_URL + "referrerlogs/" + authStore.username, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.data) {
                    hasReferrer.value = true;
                    getReferrerInfo(response.data.data.referred_by);
                } 
                else{
                    isLoading.value = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
}

const referredBy = ref(null);
const getReferrerInfo = (referred_by) => {
    axios.get(
                API_URL + "users/other/" + referred_by, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                }
            )
            .then((response) => {
                referredBy.value = response.data.data;
                isLoading.value = false;
            })
            .catch((error) => {
                console.log(error);
            });
}


const currentMonth = ref(null);
const currentYear = ref(null);
const getMonthYear = () => {

    var mnt = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    currentMonth.value = mnt[new Date().getMonth()];
    currentYear.value = new Date().getFullYear();
}

onMounted(async () => {
    if (!authStore.cid) {

        router.push({
            name: "home",
        });

    } else {
        getReferrer();
        getMonthYear();
    }
});
</script>
<template>
    
    <div  class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80" v-if="showDone">
        <div class="mt-20 bg-white p-8 rounded-lg mx-auto w-80 text-center space-y-4">
            <h2>Referrer's Info Saved!</h2>
            <p>Thanks for providing your referrer's info.</p>
            <p>
                <RouterLink to="/" class="bg-blue-900 p-2 rounded-lg hover:opacity-60 text-xs text-white">Go to Gist</RouterLink>
            </p>
        </div>
    </div>
    <Header />
    <Loading v-if="isLoading" />
    <div v-else class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Who referred you?</h1>
            <div v-if="hasReferrer" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><b>Referrer's Nickname:</b><br/>{{referredBy.name}}</div>
                <div><b>Referrer's Campus:</b><br/>{{referredBy.campus}}</div>
            </div>
            <div v-else>
                <div class="sm:pt-0">
                    <p>
                        <b>Someone told you about Kampa?</b>
                        Help the person earn a point & perhaps a reward.
                    </p>
                    <p>
                        Please enter the Phone Number of that good person into the box below and click submit.
                    </p>
                    <p>
                        Nobody referred you or don't want to provide that info now?
                        <br />
                        That's still awesome; just click on the SKIP button to continue.
                    </p>
                </div>
                <form @submit.prevent="submitForm" class="space-y-4 bg-blue-50 p-4 border border-blue-100 ">
                    <div>
                        <label for="" class="font-bold">
                            Referrer's Phone Number: <span class="text-gray-600 font-normal">(Optional)</span>
                        </label>
                        <input type="text" v-model="formData.referrer" @blur="v$.referrer.$touch" @keydown.space.prevent placeholder="e.g: 08187084716" class="w-full placeholder:text-blue-200 shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-12 text-xs border-2 bg-transparent border-blue-900" />
                        <div class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs" v-if="v$.referrer.$error">
                            <span class="w-16 float-right -mt-9 mr-2 text-xs">
                                <span>{{ v$.referrer.$errors[0].$message }}</span></span>
                        </div>
                    </div>
                    <div v-if="errorMessage" class="bg-black animate-pulse text-white text-xs p-2 mt-2 border-l-4 border-purple-900 capitalize">
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
    <Footer />
</template>
<style lang="scss" scoped></style>