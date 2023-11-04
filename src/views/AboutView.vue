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
        campus newsletter that provides the best social content for students in
        Nigerian Universities to enjoy, stay informed, and become smarter.
      </div>
      <h2>During the week . . .</h2>
      <p>
        We gather localised campus gists, excerpts from exclusive interviews,
        student surveys, career advice & tips that'll help you prepare for the
        Nigerian labour market, & more.
      </p>
      <p>
        We also curate relevant news about university education, tech,
        governance, entertainment & pop culture across Nigeria.
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
      <div>
        <h2>Why Kampa?</h2>
        <h3>4 reasons why you should check this website every Saturday</h3>
        <p><em>#1. Exclusive Gists</em></p>
        <p>
          Every Saturday we post exclusive interview excerpts, localised news,
          and more to keep you well informed.
        </p>
        <p>Just what you'll need to relax through the weekend.</p>
        <p><em>#2. Give-aways & Discounts</em></p>
        <p>
          What will an extra 10K do for you? How about a 50% discount on
          Transport fare back home at semester end?
        </p>
        <p>
          You'll get access to such give-aways and discounts every now & then.
        </p>
        <p><em>#3. Future-proof your Career</em></p>
        <p>
          Keep getting smarter and stay ahead of the game with the excellent
          career ideas & resources we share in the "<b>Graduate Well</b>" and
          "<b>FREE Resource</b>" sections.
        </p>
        <p>You'll love it!</p>
        <p><em>#4. It’s completely FREE</em></p>
        <p>
          What you'll be getting every Saturday is worth a few thousands of
          naira. BUT . . .
        </p>
        <p>You don't have to pay anything.</p>
        <div v-if="!authStore.cid">
          <p>🤩</p>
          <p>Now:</p>
          <p>
            To really understand all this "plenty grammar", just sign in now.
          </p>
          <p>
            <MyGoogleSignIn />
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style></style>
