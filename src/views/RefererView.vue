<script setup>
    import { ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
} from "@vuelidate/validators";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const errorMessage = ref(null);

const isProcessing = ref(false);

const formData = ref({
  referrer: "",
  code: "",
});


const rules = {
  referrer: {
    required: helpers.withMessage("*Required", required),
    email: helpers.withMessage("*Invalid", email),
  },
  code: {
    required: helpers.withMessage("*Required", required),
    minLength: helpers.withMessage("*Invalid", minLength(5)),
    maxLength: helpers.withMessage("*Invalid", maxLength(5)),
  },
};

const v$ = useVuelidate(rules, formData);


</script>
<template>
    <Header />
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Confirm your email!</h1>
            <div class="sm:pt-0">
                <p>Hi Moses 👋🏾</p>
                <p>We’ve sent a confirmation code to your email: <u>whatever@gmail.com</u></p>
                <p>
                  Enter the code into the box below and submit.
                </p>
            </div>
            <div class="space-y-4">
                <div>
                    <label for="" class="font-bold">Referrer's Address: <span class="text-gray-400 font-normal">(Optional)</span></label>
                    <input type="text" @keydown.space.prevent class="w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900" />
                </div>
                <div>
                    <label for="" class="font-bold">Confirmation Code: <span class="text-red-600">*</span></label>
                    <input type="text" @keydown.space.prevent class="w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900" />
                </div>
                <div class="">
                    <button v-if="v$.$invalid" disabled class="w-full bg-gray-400 shadow-lg cursor-not-allowed p-3 opacity-60 text-white rounded-lg">
                        Submit
                    </button>
                    <span v-else>
                        <button v-if="isProcessing" disabled class="w-full bg-orange-400 shadow-lg cursor-not-allowed p-3 animate-pulse opacity-60 text-white rounded-lg">
                            Processing.. .
                        </button>
                        <button v-else @click="submitForm" class="w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white rounded-lg">
                            Submit
                        </button>
                    </span>
                </div>
            </div>
            
                
                <h2>
                  Can’t find the confirmation code in your inbox?
                </h2>
                <ol class="list-decimal mt-4 mx-10 space-y-4">
                  <li>Check in the SPAM folder.</li>
                  <li>Also check under Promotions.</li>
                  <li>Still can’t find it? Wait for about 15 minutes, refresh your email & check again.</li>
                </ol>
        </div>
    </div>
    <div class="mt-20">&nbsp;</div>
    <Footer />
</template>
<style lang="scss" scoped></style>