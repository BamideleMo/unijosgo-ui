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

const userStore = useUserStore();

const errorMessage = ref(null);

const isProcessing = ref(false);

const showForm = ref(false);

const doShowForm = () => {
    showForm.value = !showForm.value;
};

const closeForm = () => {
    showForm.value = !showForm.value;
};

const formData = ref({
  code: "",
});


const rules = {
  code: {
    required: helpers.withMessage("*Required", required),
    minLength: helpers.withMessage("*Invalid", minLength(5)),
    maxLength: helpers.withMessage("*Invalid", maxLength(5)),
  },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  isProcessing.value = true;

  if(formData.value.code === userStore.cid){

      try {
        let res = await axios.patch(API_URL + "users/"+userStore.cid, {
          status: 'verified',
        });

        router.push({
          name: "gist",
        });
        
      } catch (error) {
        isProcessing.value = false;
        errorMessage.value = error.response.data.message;
      }

  }
  else{
        errorMessage.value = "Incorrect Code.";
  }
};


onMounted(async () => {
    if(!userStore.cid){

        router.push({
          name: "home",
        });

    }
});
</script>
<template>
    <ChangePhone v-if="showForm" @close-form="closeForm" />
    <Header />
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Confirmation Code</h1>
            <div class="sm:pt-0">
                <p>Hi {{userStore.name}} 👋🏾</p>
                <p>We sent a confirmation code to your phone number: <b class="text-blue-800">{{userStore.username}}</b></p>
                <p>
                    Enter the code into the box below and submit.
                </p>
            </div>
            <div class="space-y-4">
                <div>
                    <label for="" class="font-bold">Confirmation Code: <span class="text-red-600">*</span></label>
                    <input type="text" v-model="formData.code" @blur="v$.code.$touch" @keydown.space.prevent class="w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900" />
                    <div class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs" v-if="v$.code.$error">
                        <span class="w-16 float-right -mt-8 mr-2 text-xs">
                            <span>{{ v$.code.$errors[0].$message }}</span></span>
                    </div>
                </div>
                <div v-if="errorMessage" class="bg-purple-900 animate-pulse text-red-200 text-xs p-2 mt-2 border-l-4 border-black">
                    {{ errorMessage }}
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
            <h2><span class="text-xl">🤔</span> Psst...</h2>
            <p>
                <b>Didn't get confirmation code via SMS?</b><br/>Get it via WhatsApp chat: <a class="text-red-600 hover:opacity-60" href="https://wa.me/23408187084716?text=I'm%20yet%20to%20get%20Kampa%20confirmation%20code" target="_blank">Click here</a>
            </p>
            <p><b>Want to change phone number?</b>
            <br/>
                <span @click="doShowForm()" class="border-b border-black cursor-pointer text-red-600 hover:opacity-60">Click here to change <b class="text-blue-800">{{userStore.username}}</b></span>
            </p>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>