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
      <div class="sm:pt-0">
        <img src="/jet.png" alt="" class="w-72 rounded mx-auto p-3">
      </div>
      <div class="grow text-left sm:text-left text-black">
        <div class="text-lg mt-8">
          Hey {{ name }} 👋.
        </div>
        <div class="mt-6">
          <p>Welcome to UniJosGist.
            We are glad to have you aboard. Let's fly!
          </p>
        </div>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped></style>
