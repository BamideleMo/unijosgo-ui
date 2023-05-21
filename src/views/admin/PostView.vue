
<script setup>
import { ref } from "vue";
import IntroContentEditor from '../../components/IntroContentEditor.vue';
import MainContentEditor from '../../components/MainContentEditor.vue';
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import SuperMeta from "../../components/SuperMeta.vue";
import axios from "axios";
import { useUserStore } from '../../store/user-store';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const errorMessage = ref(null);
const introContent = ref(null);
const mainContent = ref(null);
const isProcessing = ref(false);

const getIntroContent = (val)=>{
  console.log(val);
  introContent.value = val;
}
const getMainContent = (val)=>{
  console.log(val);
  mainContent.value = val;
}

const formData = ref({
  topic: "",
  issue: "",
  when: "",
});

const rules = {
  topic: {
    required: helpers.withMessage("Required", required),
  },
  issue: {
    required: helpers.withMessage("Required", required),
  },
  when: {
    required: helpers.withMessage("Required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  isProcessing.value = true;

  const validation = await v$.value.$validate();
  try {
    let res = await axios.post(API_URL + 'posts', {
      topic_meta: formData.value.topic,
      issue: formData.value.issue,
      post_date: formData.value.when,
      content1: introContent.value,
      content2: mainContent.value,
    },{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userStore.token}`,
      },
    })

    userStore.setUserDetails(res);

    // isProcessing.value = false
    

    router.push({
        name: 'home',
      })

  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
};


const title = "Make Post";

</script>
<template>
  <SuperMeta :title="title" name="description" content="UniJosGist curates, create, & share fun
                and interesting perspectives & activities Jossites will enjoy." />
  <div class="">
    <h1 class="h1 font-semibold text-lg">Post</h1>
    <div class="mt-4 space-y-6 text-black">
      <div class="">
        <label for="">Topic/Meta:</label>
        <input type="text" v-model="formData.topic" @blur="v$.topic.$touch" 
          class="w-full placeholder:text-gray-900 mt-1 rounded-md outline-none px-3 py-1 h-10 border bg-transparent border-red-500" />
        <div class="text-right text-orange-500 uppercase animate-pulse mt-2 text-xs font-normal space-x-1"
          v-if="v$.topic.$error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline -mt-1">
            <path fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd" />
          </svg>

          <span>{{ v$.topic.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="">
        <label for="">Issue:</label>
        <input type="number" v-model="formData.issue" @blur="v$.issue.$touch" 
          class="w-full placeholder:text-gray-900 mt-1 rounded-md outline-none px-3 py-1 h-10 border bg-transparent border-red-500" />
        <div class="text-right text-orange-500 uppercase animate-pulse mt-2 text-xs font-normal space-x-1"
          v-if="v$.issue.$error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline -mt-1">
            <path fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd" />
          </svg>
          <span>{{ v$.issue.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="">
        <label for="">When:</label>
        <input type="text" v-model="formData.when" @blur="v$.when.$touch" 
          class="w-full placeholder:text-gray-900 mt-1 rounded-md outline-none px-3 py-1 h-10 border bg-transparent border-red-500" />
        <div class="text-right text-orange-500 uppercase animate-pulse mt-2 text-xs font-normal space-x-1"
          v-if="v$.when.$error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline -mt-1">
            <path fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd" />
          </svg>
          <span>{{ v$.when.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="">
        <label for="">Intro. Content:</label>
        <IntroContentEditor class="mt-1" @sendContent="getIntroContent"></IntroContentEditor>
      </div>
      <div class="">
        <label for="">Main Content:</label>
        <MainContentEditor class="mt-1" @sendContent="getMainContent"></MainContentEditor>
      </div>
    <div class="">
        <button v-if="v$.$invalid" disabled
          class="w-full bg-gray-400 cursor-not-allowed p-2 opacity-60 text-white rounded-lg">
          Submit
        </button>
        <span v-else class="">
        <button v-if="isProcessing" disabled
          class="w-full bg-gray-400 cursor-progress p-2 opacity-60 text-white rounded-lg">
          Processing...
        </button>
        <button v-else @click="submitForm" class="w-full bg-red-500 p-2 hover:opacity-60 text-white rounded-lg">
          Submit
        </button>
        </span>
    </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>