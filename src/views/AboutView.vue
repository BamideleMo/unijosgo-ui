<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {useHead} from '@unhead/vue'

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
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">About</h1>
            <p>
                Kampa.ng is a weekly online newsletter for Nigerian Uni students. It's the modern campus magazine
                that provides the best social content created for students to
                enjoy, stay informed, and become smarter.
            </p>
            <h2>🚀 What we do:</h2>
            <p>
                <em class="text-blue-500">Every Saturday</em> we share fun gists, interviews, opinions, and more
                that we’ve gathered during the week.</p>

            <p>
                Asides localised campus gists, we also curate national news titbits published by major newspapers especially when it's about universities in Nigeria.
            </p>
            <p>All of these will help you become smarter and stay well informed.</p>
            <p>
                But... </p><p>To really understand this "plenty grammar", just sign in and see for yourself. 😎
            </p>
            <h2>☎️ Holla @ us:</h2>
            <p>
                We're always excited to hear from you. Contact us today!<br />
                <a href="https://wa.me/23408187084716" target="_blank" class="">0818 708 4716</a>
            </p>
        </div>
    </div>
    <Footer />
</template>
<style></style>