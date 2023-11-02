<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useHead } from "@unhead/vue";
import { useUserStore } from "../store/user-store";
import MyGoogleSignIn from "../components/GoogleSignIn.vue";

const authStore = useUserStore();

useHead({
  title: "About - Kampa",
  meta: [
    {
      name: "description",
      content: `Kampa.ng is a weekly online newsletter for Nigerian Uni students. It's the modern campus magazine
                that provides the best social content that's focused on Nigerian Universities for you to
                enjoy.`,
    },
  ],
});
</script>
<template>
  <Header />
  <div class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">About</h1>
      <div class="text-xl">
        <a href="https://www.kampa.ng">www.kampa.ng</a> is the modern weekly
        campus newsletter that provides the best social content created for
        students in Nigerian Universities to enjoy, stay informed, and become
        smarter.
      </div>
      <h2>During the week . . .</h2>
      <p>
        We do a curation of relevant and 'feel-good' news about university
        education, entertainment, tech, governance, & pop culture across
        Nigeria.
      </p>
      <p>
        We also gather localised campus gists, excerpts from exclusive
        interviews, student surveys, opinions, & more.
      </p>
      <p>Then . . .</p>
      <p>
        On <em class="text-blue-500">Saturday</em>, we post all of that as one
        enjoyable newsletter to keep you informed and entertained. 🚀
      </p>
      <div v-if="!authStore.cid">
        <p>Now:</p>
        <p>
          To really understand all this "plenty grammar", just sign in & see for
          yourself:
        </p>
        <p>
          <MyGoogleSignIn />
        </p>
      </div>
    </div>
  </div>
  <div class="h-96 -mt-96" v-if="authStore.cid">
    <div class="bg-gradient-to-t from-white h-48">&nbsp;</div>
    <div class="bg-red-600 h-full">xxx</div>
  </div>
  <Footer />
</template>
<style></style>
