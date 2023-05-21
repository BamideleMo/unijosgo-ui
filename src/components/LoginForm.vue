<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import SuperMeta from "../components/SuperMeta.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const errorMessage = ref(null);
const isProcessing = ref(false);

const formData = ref({
  phone: "",
  password: "1234",
});

const mustBeNgphone = helpers.regex(/^[0][0-9]+$/);

const rules = {
  phone: {
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
    let res = await axios.post(API_URL + "login", {
      phone: formData.value.phone,
      password: "1234",
    });

    userStore.setUserDetails(res);

    router.push({
      name: "home",
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
            class="bg-red-900 animate-pulse text-red-200 text-xs p-1 rounded flex justify-between space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div class="mt-0 leading-tight border-l border-yellow-800 pl-2">
              {{ errorMessage }}
            </div>
          </div>
          <div class="">
            <label for="" class="font-bold">WhatsApp Phone Number:</label>
            <input
              type="text"
              v-model="formData.phone"
              @blur="v$.phone.$touch"
              placeholder="Example: 07035423612"
              class="w-full placeholder:text-blue-300 mt-1 rounded-md outline-none px-3 py-1 h-10 border-2 bg-transparent border-blue-900"
            />
            <div
              class="text-right text-purple-500 font-semibold mt-2 text-xs"
              v-if="v$.phone.$error"
            >
              <span class="w-16 float-right -mt-9 mr-2">
                <span>{{ v$.phone.$errors[0].$message }}</span></span
              >
            </div>
          </div>

          <div class="">
            <button
              v-if="v$.$invalid"
              disabled
              class="w-full bg-gray-400 cursor-not-allowed p-2 h-10 opacity-60 text-white rounded-lg"
            >
              Submit
            </button>
            <span v-else>
              <button
                v-if="isProcessing"
                disabled
                class="w-full bg-gray-400 cursor-progress p-2 opacity-60 text-white rounded-lg"
              >
                Processing...
              </button>
              <button
                v-else
                @click="submitForm"
                class="w-full bg-red-500 p-2 hover:opacity-60 text-white rounded-lg"
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
