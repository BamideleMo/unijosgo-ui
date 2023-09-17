<script setup>
    import { ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Available from "../components/Available.vue";
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
  password: "1234",
});

const mustBeNgphone = helpers.regex(/^[0][0-9]+$/);

const rules = {
  username: {
    required: helpers.withMessage("*Required", required),
    minLength: helpers.withMessage("*Invalid", minLength(11)),
    maxLength: helpers.withMessage("*Invalid", maxLength(11)),
    mustBeNgphone: helpers.withMessage("*Invalid", mustBeNgphone),
  },
};


const v$ = useVuelidate(rules, formData);


const API_URL = import.meta.env.VITE_API_URL;


const submitForm = async () => {

  isProcessing.value = true;

  const validation = await v$.value.$validate();

  try {
    let res = await axios.post(API_URL + "users/login", {
      username: formData.value.username,
      password: "1234",
    });
    
    authStore.setUserDetails(res);

    if (res.data.user.status === "verified") {
      router.push({
        name: "gist",
      });
    } else {

      router.push({
        name: "welcome",
      });
    }
  } catch (error) {
    console.log(error);
    isProcessing.value = false;
    errorMessage.value = error.response.data.message;
  }
};

</script>
<template>
    <Header />
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Login</h1>
            <p>
                Welcome back.
            </p>
            <p>
                Enter your phone number and click the submit button to login.
            </p>
            <form @submit.prevent="submitForm" class="">
                <div class="mt-6 space-y-4 text-sm">
                    <div class="">
                        <label for="" class="font-bold">Phone Number: <span class="text-red-600">*</span></label>
                        <input type="text" v-model="formData.username" @blur="v$.username.$touch" @keydown.space.prevent placeholder="e.g: 08187084716" class="w-full placeholder:text-blue-200 shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-12 text-xs border-2 bg-transparent border-blue-900" />
                        <div class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs" v-if="v$.username.$error">
                            <span class="w-16 float-right -mt-9 mr-2">
                                <span>{{ v$.username.$errors[0].$message }}</span></span>
                        </div>
                    </div>
                    <div v-if="errorMessage" class="bg-black animate-pulse text-white text-xs p-2 mt-2 border-l-4 border-purple-900 capitalize">
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
                            <button v-else class="w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white rounded-lg">
                                Submit
                            </button>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <Footer />
</template>
<style></style>