<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/user-store";
import SuperMeta from "../components/SuperMeta.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";

const userStore = useUserStore();

let name = ref(null);
let phone = ref(null);

const errorMessage = ref(null);

const formData = ref({
  code: "",
});

onMounted(() => {
  name.value = userStore.name || null;
  phone.value = userStore.phone || null;
});

const rules = {
  code: {
    required: helpers.withMessage("Required", required),
    minLength: helpers.withMessage("Invalid", minLength(6)),
    maxLength: helpers.withMessage("Invalid", maxLength(6)),
  },
};

const v$ = useVuelidate(rules, formData);

const title = "Welcome";
</script>
<template>
  <SuperMeta :title="title" name="description" content="Welcome aboard UniJosGist. Glad to have you!" />
  <main>
    <div class="text-base sm:flex space-y-6 sm:space-y-0 sm:space-x-6">
      <div class="sm:pt-10">
        <img src="/jet.png" alt="" class="w-72 rounded mx-auto p-3">
      </div>
      <div class="grow text-left sm:text-left">
        <div class="text-lg my-3">
          Hey {{ name }} 👋. Let's fly!
        </div>
        <div class="">
          Please enter the verification code sent to:
          <b class="font-normal text-orange-400 text-lg">{{ phone }}</b>. <span class="sm:block"></span>
          [ <span class="text-blue-400 hover:opacity-60 text-sm">Change Phone Number</span> ]
        </div>
        <form class="mt-4 space-y-4 text-sm">
          <div class="">
            <label for="">Verification code:</label>
            <div class="flex space-x-3">
              <div class="grow">
                <input type="text" v-model="formData.code" @blur="v$.code.$touch"
                  class="w-full placeholder:text-gray-900 mt-1 rounded-md outline-none px-3 py-1 h-10 border bg-transparent border-green-400" />
                <div class="text-right text-orange-500 uppercase animate-pulse mt-2 text-xs font-normal space-x-1"
                  v-if="v$.code.$error">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 inline -mt-1">
                    <path fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clip-rule="evenodd" />
                  </svg>

                  <span>{{ v$.code.$errors[0].$message }}</span>
                </div>
              </div>

              <div class="pt-1 w-36">
                <button v-if="v$.$invalid" disabled
                  class="w-full bg-gray-400 border border-gray-400 cursor-not-allowed h-10 opacity-60 text-black rounded-lg">
                  Verify
                </button>
                <button v-else @click="submitForm" class="w-full bg-green-400 border border-green-400 h-10 hover:opacity-60 text-black rounded-lg">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="">

        </div>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped></style>
