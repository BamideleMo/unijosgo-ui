<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SubmitReferrer from "../components/SubmitReferrer.vue";
import Loading from "../components/Loading.vue";
import axios from "axios";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useUserStore();


const API_URL =
    import.meta.env.VITE_API_URL;


const hasReferrer = ref(false);
const isLoading = ref(true);
const getReferrer = () => {
    axios.get(
            API_URL + "referrerlogs/" + authStore.username, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            if (response.data.data) {
                hasReferrer.value = true;
                getReferrerInfo(response.data.data.referred_by);
            } else {
                isLoading.value = false;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

const referredBy = ref(null);
const getReferrerInfo = (referred_by) => {
    axios.get(
            API_URL + "users/other/" + referred_by, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        )
        .then((response) => {
            referredBy.value = response.data.data;
            isLoading.value = false;
        })
        .catch((error) => {
            console.log(error);
        });
}

const monthlyRef = ref(null);
const getReferralMonthly = async () => {

    axios.get(
            API_URL + "referrerlogs/scores/" + authStore.username + "/" + currentMonth.value + "/" + currentYear.value, {
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

    var mnt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth.value = mnt[new Date().getMonth()];
    currentYear.value = new Date().getFullYear();

    getReferralTotal();
    getReferralMonthly();
}

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

    } else {
        getReferrer();
        getMonthYear();
    }
});
</script>
<template>
    <Header />
    <SubmitReferrer v-if="showForm" @close-form="closeForm" />
    <Loading v-if="isLoading" />
    <div v-else class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-5">
        <div class="content text-sm leading-normal space-y-4 mt-2 lg:mt-4 lg:w-7/12 lg:mx-auto">
            <h1 class="h1 font-semibold text-lg text-center">Your Referral</h1>
            <div v-if="!hasReferrer">
                <p>You're yet to provide the 'unique referral code' of the person who told you about Kampa. If you do, the person will earn a point that might get him/her a reward.</p>
                <p>
                    <span @click="doShowForm" class="link cursor:pointer">Click here to submit the 'unique referral code' of the person</span>. HOWEVER . . . if no one invited you just ignore this.
                </p>
            </div>
            <div v-else>
                <p>{{referredBy.name}} in {{referredBy.campus}} invited you to Kampa & we're thankful to him. Return the favour & invite someone too.</p>
            </div>
            <h2>Referral Report:</h2>
            <p>Your {{currentMonth}} referral count is: <b>{{monthlyRef}}</b></p>
            <p>Your total referral count is: <b>{{totalRef}}</b></p>
            <h2>Don’t keep us a secret:</h2>
            <p>Tell your friends to join Kampa too. You can even show them how to join.</p>
            <p>
                Tell them to use your 'unique referral code' when asked so you will earn a point. Because there will be different rewards for varying milestones every now and then.
            </p>
        </div>
    </div>
    <Footer />
</template>
<style lang="scss" scoped></style>