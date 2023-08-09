<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const title = "About - UniJosGo";
</script>

<template>
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">About</h1>
      <p>
        Campus168.ng is a weekly online newsletter for and about students across
        selected Nigerian campuses!
      </p>

      <h2>🚀 Features:</h2>
      <p>
        <b><u>Personalised Contents</u>:</b><br />
        <em>Every Friday</em> we post fun gists, spotlights, opinions, and more
        that we’ve discovered during the week for students to enjoy. The posts
        are completely localised for individual campuses.
      </p>
      <p>
        <b><u>Trending Topics</u>:</b><br />
        Campus168.ng lets you follow trending gists on campus and even national
        gists especially those relating to tertiary education in Nigeria.
      </p>
      <h2>☎️ Contact us:</h2>

      <p>
        We're always excited to hear from you. Contact us today!<br />
        <a href="/" target="_blank" class="">0818 708 4716</a>
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
