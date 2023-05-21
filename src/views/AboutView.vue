<script setup>
import SuperMeta from "../components/SuperMeta.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const title = "About - UniJosGo";
</script>

<template>
  <SuperMeta
    :title="title"
    name="description"
    content="UniJosGo.ng curates, create, & share fun
            and interesting perspectives & activities Jossites will enjoy."
  />
  <Header />
  <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
    <div
      class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto"
    >
      <h1 class="h1 font-semibold text-lg text-center">About</h1>
      <p>
        UniJosGo (www.unijosgo.ng) is a weekly online publication of interesting
        gists for and about students in UniJos.
      </p>
      <p>
        It's a casual project for curating, and sharing inclusive, relatable,
        interesting & fun gists that inspire other Jossites to live their best
        lives.
      </p>
      <p>
        <em>Every Friday</em> we post a volume of gists that we’ve discovered
        that week for our amazing subscribers to enjoy.
      </p>

      <h2>❤️ What Subscribers say:</h2>
      <div class="grid grid-cols-2 gap-2">
        <div
          class="bg-blue-100 border text-slate-600 border-slate-300 text-xs shadow-lg p-3 space-y-1 rounded-lg"
        >
          <p>
            "So good. I like how simple the website is. It's direct to the
            point."
          </p>
          <p class="border-t border-slate-300 pt-1">- Ada; 200L Student</p>
        </div>
        <div
          class="bg-blue-100 border text-slate-600 border-slate-300 text-xs shadow-lg p-3 space-y-1 rounded-lg"
        >
          <p>"Interesting writeups. Will recommend to my friends."</p>
          <p class="border-t border-slate-300 pt-1">- Godiya; 300L Student</p>
        </div>
      </div>

      <h2>⚠️ Disclaimer:</h2>
      <p>
        UniJosGo.ng is NOT an official platform of the University of Jos. We DO
        NOT claim any form of affiliation with the school authorities at any
        level.
      </p>
      <p>
        This website and the contents provided herein are simply for fun and
        general information purposes only.
      </p>
      <p>
        Any use of information seen on this platform is at your own risk. We
        (UniJosGo.ng & associated entities) do not assume and hereby disclaim
        any liability to any part of the loss, damage or disruption caused by
        errors or omissions, negligence or other causes that may be linked to
        this platform.
      </p>
      <h2>⛔ Terms of use:</h2>
      <p>
        You are not allowed to use this website or associated platforms if you
        are below 18 years of age.
      </p>

      <h2>☎️ Contact us:</h2>

      <p>
        We're open to collaborations and partnership. Contact us today!<br />
        <a href="/" target="_blank" class="">0818 708 4716</a>
      </p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
