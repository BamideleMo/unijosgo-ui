<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
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
    required: helpers.withMessage("Required", required),
    minLength: helpers.withMessage("Invalid", minLength(11)),
    maxLength: helpers.withMessage("Invalid", maxLength(11)),
    mustBeNgphone: helpers.withMessage("Invalid", mustBeNgphone),
  },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  isProcessing.value = true;

  const validation = await v$.value.$validate();

  try {
    let res = await axios.post(API_URL + "users/login", {
      username: formData.value.username,
      password: "1234",
    });

    authStore.setUserDetails(res);

    router.push({
      name: "loading",
    });
  } catch (error) {
    isProcessing.value = false;
    errorMessage.value = error.response.data.message;
  }
};
</script>
<template>
  <form
    class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-5 sm:p-10 rounded-lg"
  >
    <div class="flex justify-between">
      <h1 class="h1 font-semibold text-lg">
        Login to <span class="text-black">UniJos</span>Go
      </h1>
      <svg
        @click="$emit('closeForm')"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 -mt-2 -mr-2 text-red-900 hover:opacity-60 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 text-black">
      <div class="space-y-4 text-sm">
        <p class="mt-6 sm:mt-5.5">Welcome back.</p>
        <p>Enter your phone number and click the submit button to login.</p>
      </div>
      <div class="">
        <div class="mt-6 space-y-4 text-sm">
          <div
            v-if="errorMessage"
            class="bg-purple-900 animate-pulse text-red-200 text-sm p-2 rounded space-x-2"
          >
            {{ errorMessage }}
          </div>
          <div class="">
            <label for="" class="font-bold">WhatsApp Phone Number:</label>
            <input
              type="text"
              v-model="formData.username"
              @blur="v$.username.$touch"
              placeholder="Example: 07035423612"
              class="w-full placeholder:text-blue-300 mt-1 rounded-md outline-none px-3 py-2 h-12 border-2 bg-transparent border-blue-900"
            />
            <div
              class="text-right text-purple-500 font-semibold mt-1 text-xs"
              v-if="v$.username.$error"
            >
              <span class="w-16 float-right -mt-9 mr-2">
                <span>{{ v$.username.$errors[0].$message }}</span></span
              >
            </div>
          </div>

          <div class="">
            <button
              v-if="v$.$invalid"
              disabled
              class="w-full bg-gray-400 cursor-not-allowed p-3 opacity-60 text-white rounded-lg"
            >
              Submit
            </button>
            <span v-else>
              <button
                v-if="isProcessing"
                disabled
                class="w-full bg-gray-800 cursor-not-allowed animate-pulse p-3 opacity-60 text-white rounded-lg"
              >
                Processing.. .
              </button>
              <button
                v-else
                @click="submitForm"
                class="w-full bg-red-500 p-3 hover:opacity-60 text-white rounded-lg"
              >
                Submit
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
