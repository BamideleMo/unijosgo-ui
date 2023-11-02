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
        <p>Just sign in now & see for yourself:</p>
        <p>
          <MyGoogleSignIn />
        </p>
      </div>
      <div v-if="!authStore.cid">
        <h2>4 Reasons Why You Should Sign In to Join:</h2>
        <h3>#1. Exclusive Gists</h3>
        <p>
          Every Saturday we post exclusive interview excerpts, localised news,
          and more to keep you well informed.
        </p>
        <p>Just what you'll need to relax through the weekend.</p>
        <p>&nbsp;</p>
        <h3>#2. Give-aways & Discounts</h3>
        <p>
          What will an extra 10K do for you? How about a 50% discount on
          Transport fare back home at semester end?
        </p>
        <p>
          You'll get access to such give-aways and discounts every now & then.
        </p>
        <p>&nbsp;</p>
        <h3>#3. Future-proof your Career</h3>
        <p>
          Keep getting smarter and stay ahead of the game with the excellent
          career ideas & resources we share in the "<b>Graduate Well</b>" and
          "<b>Helpful Resource</b>" sections.
        </p>
        <p>You'll love it!</p>
        <p>&nbsp;</p>
        <h3>#4. It’s completely FREE</h3>
        <p>
          What you'll be getting every Saturday is worth a few thousands of
          naira. BUT . . .
        </p>
        <p>You don't have to pay anything.</p>
        <p>🤩</p>
        <p>Now:</p>
        <p>
          To really understand all this "plenty grammar", just sign in now. See
          for yourself:
        </p>
        <p>
          <MyGoogleSignIn />
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style></style>
