<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useUserStore();


const API_URL =
    import.meta.env.VITE_API_URL;


const monthlyRef = ref(null);
const getReferralMonthly = async () => {

    axios.get(
                API_URL + "referrerlogs/scores/" + authStore.username+"/"+currentMonth.value+"/"+currentYear.value, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                }
            )
            .then((response) => {
                const monthly = response.data.data;
                monthlyRef.value = monthly.length;
            })
            .catch((error) => {
                console.log(error);
            });
};


const totalRef = ref(null);
const getReferralTotal = async () => {

    axios.get(
                API_URL + "referrerlogs/scores/" + authStore.username, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                }
            )
            .then((response) => {
                const total = response.data.data;
                totalRef.value = total.length;
            })
            .catch((error) => {
                console.log(error);
            });
};


const currentMonth = ref(null);
const currentYear = ref(null);
const getMonthYear = () => {

    var mnt = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    currentMonth.value = mnt[new Date().getMonth()];
    currentYear.value = new Date().getFullYear();

    getReferralTotal();
    getReferralMonthly();
}


onMounted(async () => {
    if (!authStore.cid) {

        router.push({
            name: "home",
        });

    } else {
        getMonthYear();
    }
});
</script>
<template>
    <Header />
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Tell your friends to subscribe!</h1>
            <div class="grid grid-cols-2 gap-4">
                <div><u><span class="text-blue-900">All time:</span> You've referred:</u> <br /><b>{{totalRef}}</b> Friends</div>
                <div><u><span class="text-blue-900">All time:</span> You've earned:</u> <br /><b>{{totalRef}}</b> Points</div>
                <div><u><span class="text-blue-900">{{currentMonth}}, {{currentYear}}:</span> You've referred:</u> <br /><b>{{monthlyRef}}</b> Friends</div>
                <div><u><span class="text-blue-900">{{currentMonth}}, {{currentYear}}:</span> You've earned:</u> <br /><b>{{monthlyRef}}</b> Points</div>
            </div>
            <div>
                <h2>Earn points:</h2>
                <p>
                    Get your friends to subscribe to Kampa.
                </p>
                <p>
                    For each one of your friends that subscribes and enters your email address as the referrer, you will earn a point.
                </p>
                <p>
                    Your points can get you rewards. There will be different rewards for varying milestones every other month.
                </p>
                <h2>
                    <RouterLink to="/referred-by" class="bg-blue-900 text-white p-2 hover:opacity-60 rounded-lg">Who referred you?</RouterLink>
                </h2>
            </div>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>