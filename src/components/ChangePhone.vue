<script setup>
    import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from "@vuelidate/validators";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useUserStore();

const errorMessage = ref(null);
const isProcessing = ref(false);

const formData = ref({
  username: "",
});

const sent = ref(false);


const rules = {
  username: {
    required: helpers.withMessage("*Required", required),
    email: helpers.withMessage("*Invalid", email),
  },
};

const v$ = useVuelidate(rules, formData);


  const API_URL = import.meta.env.VITE_API_URL;

const submitForm = async () => {

  isProcessing.value = true;

  const validation = await v$.value.$validate();

  try {
    let res = await axios.patch(API_URL + "users/"+authStore.cid, {
      username: formData.value.username,
    },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            });

    logoutLoginNow();

    
  } catch (error) {
    isProcessing.value = false;
    errorMessage.value = error;
  }
};


const logoutLoginNow = async () => {

    authStore.clearUser();

  try {
    let res = await axios.post(API_URL + "users/login", {
      username: formData.value.username,
      password: "1234",
    });
    
    authStore.setUserDetails(res);

    if(res.data.user.status === 'unverified'){
        sent.value = true;
        router.push({
            name: "welcome",
        });
    }
    else{
        router.push({
            name: "gist",
        });

    }

  } catch (error) {
    console.log(error);
  }
};

</script>
<template>
    <div class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <form @submit.prevent="submitForm" class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-3 sm:p-10 rounded-lg">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    Change Email
                </h1>
                <svg @click="$emit('closeForm')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div v-if="sent">
                <div class="w-1/2 mx-auto drop-shadow-lg p-6 text-center text-xs">
                    <p>Email address changed successfully.</p>
                    <p class="mt-12">
                        <button @click="$emit('closeForm')" class="bg-blue-900 text-white p-2 rounded-full hover:opacity-60">Alright</button>
                    </p>
                </div>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 text-black">
                <div class="space-y-4 text-xs">
                    <p class="mt-6 sm:mt-5.5">
                        Enter another eamil address that is active and you have access to.
                    </p>
                </div>
                <div class="">
                    <div class="mt-6 space-y-4 text-sm">
                        <div class="">
                            <div v-if="errorMessage" class="lg:col-span-3 bg-yellow-400 px-3 py-1 animate-pulse mb-2">
                                {{ errorMessage }}
                            </div>
                            <input placeholder="Type email here..." type="text" v-model="formData.username" @blur="v$.username.$touch" @keydown.space.prevent class="placeholder:text-gray-300 w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900" />
                            <div class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs" v-if="v$.username.$error">
                                <span class="w-16 float-right -mt-8 mr-2">
                                    <span>{{ v$.username.$errors[0].$message }}</span></span>
                            </div>
                        </div>
                        <div class="">
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
                </div>
            </div>
        </form>
    </div>
</template>