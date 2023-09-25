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

const mustBeNgphone = helpers.regex(/^[0][0-9]+$/);

const rules = {
  username: {
    required: helpers.withMessage("*Required", required),
    email: helpers.withMessage("*Invalid", email),
    // minLength: helpers.withMessage("*Invalid", minLength(11)),
    // maxLength: helpers.withMessage("*Invalid", maxLength(11)),
    // mustBeNgphone: helpers.withMessage("*Invalid", mustBeNgphone),
  },
};

const v$ = useVuelidate(rules, formData);


  const API_URL = import.meta.env.VITE_API_URL;

const submitForm = async () => {

  isProcessing.value = true;

  const validation = await v$.value.$validate();

  try {
    let res = await axios.patch(API_URL + "users/"+userStore.cid, {
      username: formData.value.username,
    });

    sendSMS();
    
  } catch (error) {
    isProcessing.value = false;
    errorMessage.value = error.response.data.message;
  }
};

const sendSMS = async () => {
    try{

        let res = await axios.post("https://api.ng.termii.com/api/sms/send", {
            api_key: "TLWK68ATIe2skreBC99fl2dy7ltYNjpqpJweEoRqLRCPOamqO54zIP4RmGVh5P",
            to: '234'+formData.value.username,
            from: "Kampa",
            sms: "Your Kampa confirmation code is: " + userStore.cid,
            type: "plain",
            channel: "generic",
          });


        router.push({
            name: "welcome",
        });
    }
    catch(error){
        console.log(error)
    }
};


</script>
<template>
    <div  class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <form @submit.prevent="submitForm" class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-3 sm:p-10 rounded-lg">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    Change Email
                </h1>
                <svg @click="$emit('closeForm')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div v-if="errorMessage" class="bg-purple-900 animate-pulse text-red-200 text-xs p-2 mt-2 border-l-4 border-black">
                {{ errorMessage }}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 text-black">
                <div class="space-y-4 text-xs">
                    <p class="mt-6 sm:mt-5.5">You will be asked to Login with this new email address & enter the confirmation code you'll receive.
                    </p>
                </div>
                <div class="">
                    <div class="mt-6 space-y-4 text-sm">
                        <div class="">
                            <label for="" class="font-bold">New Email: <span class="text-red-600">*</span></label>
                            <input type="text" v-model="formData.username" @blur="v$.username.$touch" @keydown.space.prevent class="placeholder:text-blue-200 w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900" />
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