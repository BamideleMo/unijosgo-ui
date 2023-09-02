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

const userStore = useUserStore();

const errorMessage = ref(null);

const isProcessing = ref(false);

const formData = ref({
  name: "",
  username: "",
  campus: "",
  password: "1234",
  user_category: "user",
});

// const mustBeNgphone = helpers.regex(/^[0][0-9]+$/);

const rules = {
  name: {
    required: helpers.withMessage("*Required", required),
    minLength: helpers.withMessage("*Invalid", minLength(2)),
  },
  username: {
    required: helpers.withMessage("Required", required),
    email: helpers.withMessage("Invalid", email),
    // minLength: helpers.withMessage("Invalid", minLength(11)),
    // maxLength: helpers.withMessage("Invalid", maxLength(11)),
    // mustBeNgphone: helpers.withMessage("Invalid", mustBeNgphone),
  },
  campus: {
    required: helpers.withMessage("Required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  isProcessing.value = true;

  const validation = await v$.value.$validate();
  try {
    let res = await axios.post(API_URL + "users/register", formData.value);

    userStore.setUserDetails(res);

    router.push({
      name: "welcome",
    });
  } catch (error) {
    isProcessing.value = false;
    errorMessage.value = error.response.data.message;
  }
};

const title = "Subscribe";
</script>
<template>
  <form
    class="w-11/12 lg:w-7/12 mx-auto mt-10 sm:mt-20 bg-white p-5 pb-10 sm:p-10 rounded-lg"
  >
    <div class="flex justify-between border-b border-black">
      <h1 class="h1 font-semibold text-lg">
        Subscribe
      </h1>
      <svg
        @click="$emit('closeForm')"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div
      v-if="errorMessage"
      class="bg-purple-900 animate-pulse text-red-200 text-xs p-2 mt-2 border-l-4 border-black"
    >
      {{ errorMessage }}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 text-black">
      <div class="space-y-4 text-sm">
        <p class="mt-6 sm:mt-5.5">
          Join many other Nigerian students who get to read exclusive,
          fun & interesting gist completely localised for their individual
          campuses every week.
        </p>
        <p>
          Currently available in: UniJos, ABU-Zaria & UniAbuja.</p>
          <p>To be
          available in more campuses soon.
        </p>
      </div>
      <div class="">
        <div class="mt-6 space-y-4 text-sm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="">
              <label for="" class="font-bold">Name:</label>
              <input
                type="text"
                v-model="formData.name"
                @blur="v$.name.$touch"
                placeholder="E.g: Lekan"
                class="w-full placeholder:text-blue-300 shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900"
              />
              <div
                class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs"
                v-if="v$.name.$error"
              >
                <span class="w-16 float-right -mt-8 mr-2 text-xs">
                  <span>{{ v$.name.$errors[0].$message }}</span>
                </span>
              </div>
            </div>
            <div class="">
              <label for="" class="font-bold">Campus:</label>
              <select
                v-model="formData.campus"
                @blur="v$.campus.$touch"
                class="w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900"
              >
                <option value="">&nbsp;</option>
                <option value="UniJos">UniJos</option>
                <option value="UniAbuja">UniAbuja</option>
                <option value="ABU">ABU, Zaria</option>
              </select>
              <div
                class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs"
                v-if="v$.campus.$error"
              >
                <span class="w-16 float-right -mt-8 mr-2 text-xs">
                  <span>{{ v$.campus.$errors[0].$message }}</span></span
                >
              </div>
            </div>
          </div>
          <div class="">
            <label for="" class="font-bold">Email Address:</label>
            <input
              type="text"
              v-model="formData.username"
              @blur="v$.username.$touch"
              class="w-full shadow-lg mt-1 rounded-md outline-none px-1 py-2 h-10 text-xs border-2 bg-transparent border-blue-900"
            />
            <div
              class="text-right text-red-600 animate-pulse font-semibold mt-1 text-xs"
              v-if="v$.username.$error"
            >
              <span class="w-16 float-right -mt-8 mr-2 text-xs">
                <span>{{ v$.username.$errors[0].$message }}</span></span
              >
            </div>
          </div>

          <div class="">
            <button
              v-if="v$.$invalid"
              disabled
              class="w-full bg-gray-400 shadow-lg cursor-not-allowed p-3 opacity-60 text-white rounded-lg"
            >
              Submit
            </button>
            <span v-else>
              <button
                v-if="isProcessing"
                disabled
                class="w-full bg-orange-400 shadow-lg cursor-not-allowed animate-pulse p-3 opacity-60 text-white rounded-lg"
              >
                Processing.. .
              </button>
              <button
                v-else
                @click="submitForm"
                class="w-full bg-red-500 shadow-lg p-3 hover:opacity-60 text-white rounded-lg"
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
