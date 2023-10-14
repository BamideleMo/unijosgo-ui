<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useUserStore } from "../store/user-store";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {useHead} from '@unhead/vue';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const volumeContent = ref(null);

const API_URL =
    import.meta.env.VITE_API_URL;

const updateLog = (volume, log) => {
    axios
        .patch(
            API_URL + "logs/" + volume, {
                log: log,
            }, {
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
            if (response.data.data.status === 'complete') {
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
}

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
}

onMounted(async () => {
    getUser();
});

useHead({
    title: 'Gists - Kampa',
    meta: [{
        name: 'description',
        content: `Localised campus gists.`
    }]
})
</script>
<template>
    <Header />
    <Loading v-if="!volumeContent" />
    <div v-else class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-2">
        <div class="content leading-snug lg:leading-loose space-y-4 mt-2 lg:mt-4 sm:w-9/12 lg:w-7/12 sm:mx-auto">
            <div class="date flex justify-between text-sm">
                <span class="capitalize border-b border-black">Vol. #{{ volumeContent.volume }}</span>
                <span class="capitalize border-b border-black">{{ volumeContent.post_date }}</span>
            </div>
            <div class="at my-6">
                <span class="capitalize text-gray-500 text-4xl">
                    Kampa<b class="text-black uppercase">@{{user.campus}}</b>
                </span>
            </div>
            <div v-html="volumeContent.gist"></div>
        </div>
    </div>
    <Footer />
</template>