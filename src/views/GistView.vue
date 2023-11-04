<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useUserStore } from "../store/user-store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useHead } from "@unhead/vue";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const volumeContent = ref(null);

const API_URL = import.meta.env.VITE_API_URL;

const updateLog = (volume, log) => {
  axios
    .patch(
      API_URL + "logs/" + volume,
      {
        log: log,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const obj = ref({});
const getLog = (val) => {
  axios
    .get(API_URL + "logs/" + val, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      if (!response.data.data.log) {
        obj.value[userStore.cid] = new Date();
        updateLog(val, obj.value);
      } else {
        const logs = response.data.data.log;
        logs[userStore.cid] = new Date();
        updateLog(val, logs);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getVolume = (val) => {
  axios
    .get(API_URL + "gists/" + val, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      getLog(response.data.data.volume);
      volumeContent.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const user = ref(null);
const getUser = () => {
  axios
    .get(API_URL + "users/" + userStore.cid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => {
      user.value = response.data.data;
      console.log(response.data.data.status);
      if (response.data.data.status === "complete") {
        checkVol();
      } else {
        router.push({
          name: "welcome",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkVol = () => {
  if (route.query.v) {
    getVolume(route.query.v);
  } else {
    axios
      .get(API_URL + "gists/latest", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((response) => {
        volumeContent.value = response.data.data;
        getLog(response.data.data.volume);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getMonthYear();
};

const currentMonth = ref(null);
const currentYear = ref(null);
const getMonthYear = () => {
  var mnt = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  currentMonth.value = mnt[new Date().getMonth()];
  currentYear.value = new Date().getFullYear();

  getReferralMonthly();
};

const monthlyRef = ref(null);
const getReferralMonthly = async () => {
  axios
    .get(
      API_URL +
        "referrerlogs/scores/" +
        authStore.username +
        "/" +
        currentMonth.value +
        "/" +
        currentYear.value,
      {
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

onMounted(async () => {
  getUser();
});

useHead({
  title: "Gists - Kampa",
  meta: [
    {
      name: "description",
      content: `Localised campus gists.`,
    },
  ],
});
</script>
<template>
  <Header />
  <Loading v-if="!volumeContent" />
  <div v-else class="w-10/12 sm:w-10/12 lg:w-9/12 mx-auto py-2">
    <div class="content space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto">
      <div class="date flex justify-between text-sm">
        <span class="capitalize border-b border-black"
          >Post #{{ volumeContent.volume }}</span
        >
        <span class="capitalize border-b border-black">{{
          volumeContent.post_date
        }}</span>
      </div>
      <div class="text-center py-6">
        <span class="capitalize text-3xl sm:text-4xl uppercase font-semibold"
          >@{{ user.campus }}
        </span>
      </div>
      <div v-html="volumeContent.gist"></div>
      <div class="">
        <h2>Tell friends about us</h2>
        <h3>Hope you enjoyed this week's post.</h3>
        <p>For more interesting gists check back again next Saturday.</p>
        <p>
          And please ask your friends to also sign in to join Kampa for weekly
          updates. Tell them to use your 'unique referral code' when they sign
          in so that you can earn points. Because points can earn you rewards.
        </p>
        <p>
          Your {{ currentMonth }} referral count: <b>{{ monthlyRef }}</b>
        </p>
        <p class="">
          Your custom referral code: <b>{{ userStore.cid }}</b>
        </p>
        <p class="text-xs">
          <RouterLink to="/referral">More about your referral</RouterLink>
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>
