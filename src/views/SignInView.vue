
<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import axios from "axios";
import { useUserStore } from '../store/user-store';
import SuperMeta from "../components/SuperMeta.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const errorMessage = ref(null);

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

  const validation = await v$.value.$validate();


  try {
    let res = await axios.post(API_URL + 'login', {
      phone: formData.value.phone,
      password: "1234",
    })

    userStore.setUserDetails(res);

    router.push({
        name: 'home',
      })
  
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
};
const title = "Sign In";
</script>
<template>
    <SuperMeta :title="title" name="description" content="Sign to UniJosGist" />

    <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 text-black">
        <div class="">
            <h1 class="h1 font-semibold text-lg">Sign In</h1>

        <div class="mt-6 space-y-4 text-sm">
        <div v-if="errorMessage"
            class="bg-red-900 animate-pulse text-red-200 text-xs p-1 rounded flex justify-between space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div class="mt-0 leading-tight border-l border-yellow-800 pl-2">
            {{ errorMessage }}
            </div>
        </div>
        <div class="">
            <label for="">WhatsApp Phone Number:</label>
            <input type="text" v-model="formData.phone" @blur="v$.phone.$touch" placeholder="E.g.: 07035423612"
            class="w-full placeholder:text-red-100 mt-1 rounded-md outline-none px-3 py-1 h-10 border-2 bg-transparent border-red-500" />
            <div class="text-right text-orange-500 uppercase animate-pulse mt-2 text-xs font-normal space-x-1"
            v-if="v$.phone.$error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline -mt-1">
                <path fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd" />
            </svg>

            <span>{{ v$.phone.$errors[0].$message }}</span>
            </div>
        </div>

        <div class="">
            <button v-if="v$.$invalid" disabled
            class="w-full bg-gray-400 cursor-not-allowed p-2 h-10 opacity-60 text-white rounded-lg">
            Submit
            </button>
            <button v-else @click="submitForm" class="w-full bg-red-500 p-2 h-10 hover:opacity-60 text-white rounded-lg">
            Submit
            </button>
        </div>
        </div>
        </div>
        <div class="space-y-4 text-sm">
      <div class="mt-6 sm:mt-16 pt-2 font-semibold">Yet to subscribe? 
        <RouterLink class="text-red-600 hover:opacity-60" to="/subscribe">Subscribe</RouterLink> now.</div>
      <p class="">
          Join over 300 other subscribes who have access to our exclusive fun content.
        </p>
      </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>