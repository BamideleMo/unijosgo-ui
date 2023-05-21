<script setup></script>
<template>
  <div class="bg-white border-b shadow-lg py-2">
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
      <div class="drop-shadow-lg">
        <RouterLink to="/" class="text-3xl font-extrabold hover:opacity-60">
          <span class="text-black">UniJos</span><span class="myred">Gö</span>
        </RouterLink>
        <div class="-mt-1 text-gray-600 text-xs">
          <RouterLink to="/" class="hover:opacity-60"
            >www.unijosgo.ng</RouterLink
          >
        </div>
      </div>
      <div class="pt-3 sm:pt-4 drop-shadow-lg">
        <RouterLink
          to="/about"
          class="bg-black text-white text-sm py-2 px-3 hover:opacity-40 cursor-pointer"
          >About</RouterLink
        >
      </div>
    </div>
  </div>
</template>
