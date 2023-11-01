<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {useHead} from '@unhead/vue'

useHead({
    title: 'Terms, Disclaimer & Privacy Policy - Kampa',
    meta: [{
        name: 'description',
        content: `This website and the contents provided herein are simply for fun and
        general information purposes only.`
    }]
})
</script>

<template>
  <Header />
  <div class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">Terms of use</h1>
      <p>
        You are not allowed to use this website or associated platforms if you
        are below 18 years of age.
      </p>
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
        Your privacy is important and so we'll never give your information to any other entity.
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
