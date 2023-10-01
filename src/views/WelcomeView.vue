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

const authStore = useUserStore();

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

const API_URL = import.meta.env.VITE_API_URL;
  
const submitForm = async () => {

  isProcessing.value = true;

  if(formData.value.code === authStore.cid){

    axios
        .patch(
            API_URL + "users/" + authStore.cid, {
                status: 'verified',
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            router.push({
              name: "referredby",
            });
        })
        .catch((error) => {
            console.log(error);
            isProcessing.value = false;
            errorMessage.value = error.response.data.message;
        });

  }
  else{
        errorMessage.value = "Incorrect Code. Check and try again.";
        isProcessing.value = false;
  }
};

const sendLink = () =>{
     isProcessing.value = true;
    axios
        .post(
            API_URL + "email",{
                username: authStore.username,
                cid: authStore.cid,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            router.push({
              name: "emailsent",
            });
        })
        .catch((error) => {
            console.log(error);
            isProcessing.value = false;
        });
}


onMounted(async () => {
    if(!authStore.cid){

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
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-5/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Welcome!</h1>
            <div class="sm:pt-0">
                <p>Prove you're not a robot. Confirm your email.</p>
                <p>
                    Click on the blue button below and we'll send a confirmation link to your email: <b>{{authStore.username}}</b>
                </p>
                <div class="pb-4">

                    <button v-if="isProcessing" class="bg-orange-400 text-white px-4 py-2 rounded-lg hover:opacity-60 animate-pulse" @click="sendLink">
                        Sending confirmation link.. .
                    </button>

                    <button v-else class="bg-blue-900 text-white px-4 py-2 rounded-lg hover:opacity-60" @click="sendLink">
                        Send me a confirmation link
                    </button>
                </div>
            </div>
            <p><b>🤔 Want to change email address?</b><br/>
            
                <span @click="doShowForm()" class="cursor-pointer text-red-600 hover:opacity-60">
                    <span class="border-b border-black">Click here to change</span> <b class="text-blue-800">{{authStore.username}}</b>
                </span>
            </p>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>