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
      <h1 class="h1 font-semibold text-lg text-center">Disclaimer</h1>
      <p>
        This website and the contents provided herein are simply for fun and
        general information purposes only.
      </p>
      <p>
        Any use of information seen on this platform is at your own risk. We
        (Kampa.ng & associated entities) do not assume and hereby disclaim
        any liability to any part of the loss, damage or disruption caused by
        errors or omissions, negligence or other causes that may be linked to
        this platform.
      </p>
      <p>
        You are not allowed to use this website or associated platforms if you
        are below 18 years of age.
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
