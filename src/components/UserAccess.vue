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
  name: "Doe",
  username: "",
  campus: "",
  password: "1234",
  user_category: "user",
  status: "unverified",
});

const rules = {
  username: {
    required: helpers.withMessage("Email is Required", required),
    email: helpers.withMessage("Invalid Email", email),
  },
  campus: {
    required: helpers.withMessage("University is Required", required),
  },
};

const v$ = useVuelidate(rules, formData);


const API_URL = import.meta.env.VITE_API_URL;

const loginNow = async () => {

  try {
    let res = await axios.post(API_URL + "users/login", {
      username: formData.value.username,
      password: "1234",
    });
    
    authStore.setUserDetails(res);

    if(res.data.user.status === 'unverified'){
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


const submitForm = async () => {

  isProcessing.value = true;

  const validation = await v$.value.$validate();
  try {
    console.log('try')
    let res = await axios.post(API_URL + "users/register", formData.value);
    loginNow();
  } catch (error) {
    console.log(error)
    isProcessing.value = false;
    // errorMessage.value = error.response.data.message;
  }
};

</script>
<template>
    <form @submit.prevent="submitForm">
        <div class="mt-6 text-xs w-full lg:w-10/12 border border-gray-500 p-2 sm:p-3 shadow-lg">
            <div v-if="v$.username.$error || v$.campus.$error || errorMessage" class="">
                <div class="lg:grid lg:grid-cols-4 lg:gap-3" v-if="v$.username.$error || v$.campus.$error">
                    <div class="lg:col-span-3 grid grid-cols-2 gap-1.5 lg:gap-3">
                        <div v-if="v$.campus.$error" class="bg-yellow-400 px-3 py-1 animate-pulse mb-2">{{ v$.campus.$errors[0].$message }}</div>
                        <div v-if="v$.username.$error" class="bg-yellow-400 px-3 py-1 animate-pulse mb-2">{{ v$.username.$errors[0].$message }}</div>
                    </div>
                    <div class="hidden lg:block">&nbsp;</div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-3" v-if="errorMessage">
                    <div v-if="errorMessage" class="lg:col-span-3 bg-yellow-400 px-3 py-1 animate-pulse mb-2">
                            {{errorMessage}}
                    </div>
                    <div class="hidden lg:block">&nbsp;</div>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div class="sm:col-span-3 flex space-x-1.5 lg:space-x-3">
                    <select v-model="formData.campus" @blur="v$.campus.$touch" class="bg-white border border-black h-12 p-2 w-36 outline-none disabled:text-red-600" required>
                        <option value="" disabled selected>Select University</option>
                        <option value="UNIJOS">UNIJOS</option>
                        <option value="KASU">KASU</option>
                        <option value="UNIABUJA">UNIABUJA</option>
                        <option value="ABU">ABU</option>
                    </select>
                    <input v-model="formData.username" @blur="v$.username.$touch" class="bg-white border border-black h-12 p-2 w-full outline-none placeholder:text-gray-400" placeholder="Type Your Email" />
                </div>
                <div class="mt-1 sm:mt-0">
                        <button v-if="v$.$invalid" disabled class="h-12 capitalise w-full bg-blue-900 shadow-lg cursor-not-allowed p-3 opacity-60 text-white">
                            I'm in
                        </button>
                        <span v-else>
                            <button v-if="isProcessing" disabled class="h-12 w-full bg-orange-400 shadow-lg cursor-not-allowed animate-pulse p-3 opacity-60 text-white">
                                Processing.. .
                            </button>
                            <button v-else class="h-12 w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white">
                                I'm in
                            </button>
                        </span>
                </div>
            </div>
        </div>
    </form>
</template>
<style>
    select:invalid{
        color:rgb(156 163 175) !important;
    }
</style>