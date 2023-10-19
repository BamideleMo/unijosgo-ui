<script setup>
const props = defineProps({
  which: {
    type: String,
  },
});
</script>
<template>
    <div class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <div class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-5 sm:p-10 rounded-lg">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    Kampa {{props.which}} App
                </h1>
                <svg @click="$emit('closeForm')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="text-black text-sm space-y-4 pt-4">
                <p>We are working on Kampa {{props.which}} app and it will be available on the <span v-if="props.which === 'Android'">Google Play</span> <span v-if="props.which === 'iOS'">App</span> store soon.</p>
                <p>
                    But in the mean time, sign in on this website to join and start getting interesting and fun gists to help you stay informed and become smarter!
                </p>
            </div>
        </div>
    </div>
</template>