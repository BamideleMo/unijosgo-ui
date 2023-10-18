<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useHead } from '@unhead/vue'
import { useUserStore } from "../store/user-store";


const authStore = useUserStore();

useHead({
    title: 'About - Kampa',
    meta: [{
        name: 'description',
        content: `Kampa.ng is a weekly online newsletter for Nigerian Uni students. It's the modern campus magazine
                that provides the best social content that's focused on Nigerian Universities for you to
                enjoy.`
    }]
})
</script>
<template>
    <Header />
    <div class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">About</h1>
            <p>
                Kampa informs and helps Nigerian Uni students become smarter by curating and creating smart, fun & localised content for students to enjoy.
            </p>
            <p>
                It's a weekly online newsletter for Nigerian Uni students. A modern
                campus magazine
                that provides the best social content created for students to
                enjoy, stay informed, and become smarter.
            </p>
            <h2>🚀 What we do:</h2>
            <p>
                <em class="text-blue-500">Every Saturday</em> we share fun gists, interviews, opinions, and more
                that we’ve gathered during the week.</p>
            <p>
                We curate 'feel-good' news titbits published by reputable news outlets especially when it's about 
                pop culture, governance or university education in Nigeria alongside localised campus gists.
            </p>
            <div v-if="!authStore.cid">
                <p>
                    Now... </p>
                <p>To better understand all this "plenty grammar", just sign in to see for yourself:
                </p>
                <p>
                    <GoogleLogin :callback="callback" class="border-2 border-red-600 rounded hover:opacity-60 drop-shadow-lg bg-red-600" />
                </p>
            </div>
        </div>
    </div>
    <Footer />
</template>
<style></style>