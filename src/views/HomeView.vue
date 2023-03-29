<script setup>
import { onMounted, ref } from "vue";
import BaseModal from "../components/BaseModal.vue";
import Subscribe from "../components/Subscribe.vue";
import SignIn from "../components/SignIn.vue";
import SuperMeta from "../components/SuperMeta.vue";
import { useUserStore } from '../store/user-store';
import Welcome from "../components/Welcome.vue";

const userStore = useUserStore();

const modalActive = ref(null);
const whichModal = ref(null);
const toggleModal = (which) => {
  modalActive.value = !modalActive.value;
  whichModal.value = which;
};

let name = ref(null);
let phone = ref(null);
let phone_verification = ref(null);

onMounted(() => {
  name.value = userStore.name || null
  phone.value = userStore.phone || null
  phone_verification.value = userStore.phone_verification || null
});


const title = "UniJosGist";
</script>

<template>
  <SuperMeta :title="title" name="description" content="Read the latest fun
              and interesting gist for Jossites." />
  <main>
    <!-- <Welcome v-if="userStore.uuser_id && !phone_verification" /> -->
    <div>
      <div class="content space-y-4">

        <div class="flex space-x-6 text-gray-600 pt-8 pb-4">
          <div>
            Issue #1
          </div>
          <div>
            Fri. March 24, 2023
          </div>
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 inline text-red-600">
              <path
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            200
          </div>
        </div>
        
        <div class="">
          Hey {{ name }} 👋
        </div>
        <p>
          Welcome to the weekend of the 5th Week of 2023. This means there are 47
          more weeks before the year 2023 ends.
        </p>
        <p>
          This particular gist is a “pre-launch gist” meant to give you an idea of
          what to expect when we eventually launch.
        </p>
        <p>The Gist... 😎</p>
        <ul>
          <li>
            <b>#SponsoredGist</b>
            The safest way to buy, or sell used iPhones in Jos.
          </li>
          <li>
            <b>#SocialLife</b>
            3 Female UJ Students talk about their personal “Hookup Experiences”.
          </li>
          <li>
            <b>#StudentHustle</b>
            Are you a 200 or 300 level UJ student? Work with UJG, & GET PAID.
          </li>
          <li>
            <b>#Aluta</b>
            Will UniJos be ever ready for a female SUG president?
          </li>
          <li>
            <b>#My2Cents</b>
            2 things you should do before you graduate!
          </li>
          <li>
            <b>#FromTheWeb</b>
            2023 university rankings, Rema abandones Uni, DJ Cuppy graduated, Male
            student shows female lecturer love & 1 more gist.
          </li>
          <li>
            <b>#FreeRechargeCard</b>
            2k MTN recharge pin for 1 lucky winner.
          </li>
        </ul>
      </div>
      <div v-if="!userStore.uuser_id">
        <div
          class=" bg-gradient-to-r from-violet-900 to-blue-900 px-2 sm:px-10 py-6 rounded-lg my-6 text-center 
          text-sm sm:text-base text-white">
          <h2 class="">
            Subscribe to Continue reading.
            <b>300+ students have already subscribed</b>. Click the button below. It
            is FREE
          </h2>
          <div class="text-center mt-6 mb-3">
            <span @click="toggleModal('subscribe')" to="/"
              class="bg-black cursor-pointer drop-shadow-lg p-3 rounded-lg text-white space-x-3 hover:opacity-60">
              <span>Subscribe</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 inline-block -mt-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
          </div>
          <div class="text-center mt-8 text-lg">
            Already Subscribed?
            <span @click="toggleModal('sign-in')"
              class="cursor-pointer border-b-4 border-red-600 rounded hover:opacity-60">Sign
              In</span>
          </div>
        </div>
        <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
          <div class="my-6">
            <Subscribe v-if="whichModal === 'subscribe'" />
            <SignIn v-if="whichModal === 'sign-in'" />
          </div>
        </BaseModal>
      </div>
      <div v-else class="">
        <div class="content2 space-y-4">
          <hr>
          <p class="">gee</p>
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/" class="text-white bg-red-600 p-2 sm:w-96 mx-auto rounded hover:opacity-60">
            Archive: See all Issues
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
