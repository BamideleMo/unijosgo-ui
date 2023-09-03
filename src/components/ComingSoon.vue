<script setup>
</script>
<template>
    <div class="min-h-screen fixed bg-slate-900 top-0 w-full z-50 bg-opacity-80">
        <div class="w-11/12 lg:w-6/12 mx-auto mt-10 sm:mt-20 bg-white p-5 sm:p-10 rounded-lg">
            <div class="flex justify-between border-b border-black">
                <h1 class="h1 font-semibold text-lg">
                    Mobile Apps
                </h1>
                <svg @click="$emit('closeForm')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -mt-2 -mr-2 text-slate-900 hover:opacity-60 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="text-black text-sm space-y-4 pt-4">
                <p>Kampa.ng Android app and iOS app are in the works. Our team of developers are working really hard to make that happen.</p>
                <p>
                    In the mean time, enjoy our web app (this website) and explore interesting and fun gist to help you stay informed and become smarter!
                </p>
            </div>
        </div>
    </div>
</template>