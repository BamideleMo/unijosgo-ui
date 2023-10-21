<script setup>
    import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import SubmitReferrer from "../components/SubmitReferrer.vue";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter,useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();


const showForm = ref(false);
const doShowForm = () => {
    showForm.value = !showForm.value;
};

const closeForm = () => {
    showForm.value = !showForm.value;
};


onMounted(async () => {
    if (!authStore.cid) {

        router.push({
            name: "home",
        });

    } 
});
</script>
<template>
    <Header />
    <SubmitReferrer v-if="showForm" @close-form="closeForm" />
    <div class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">You're in :)</h1>
            <p>Thanks for joining.</p>
            <p>We created <a href="https://www.kampa.ng">kampa.ng</a> to help students in universties stay informed and become smarter. We tried a lot of news platforms meant for uni students over the years and none of them was truly helpful. 
            <a href="https://www.kampa.ng">kampa.ng</a> is different.</p>
            
            <h2>One last thing . . .</h2>
            <p>
            Did someone invite you or tell you about <a href="https://www.kampa.ng">kampa.ng</a>? Let the person earn a point when you submit his/her 'Unique Referral Code'. <span @click="doShowForm" class="link">Click here to submit it</span>.
            </p>
            <p>
                If no one invited you, just <RouterLink to="/">click here to read our latest gist</RouterLink>.
            </p>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>