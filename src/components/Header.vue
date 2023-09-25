<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user-store";
import Logo from "./Logo.vue";
import MenuIcon from "./icons/IconMenu.vue"
import IconClose from "./icons/IconClose.vue"
import { useRouter } from "vue-router";

const authStore = useUserStore();
const router = useRouter();


const logout = () => {
    authStore.clearUser();
    router.push({ name: "home" });
};

const showMenu = ref(false);
const toggleShowMenu = () => {
    showMenu.value = !showMenu.value;
}
</script>
<template>
    <div v-if="showMenu" class="w-screen h-screen top-0 fixed bg-black bg-opacity-90 z-50 flex ">
        <div class="grow border-t-2 border-red-600">&nbsp;</div>
        <div class="bg-white w-60 xl:w-80 text-sm xl:text-sm">
            <div class="flex border-b shadow-lg py-2.5 pl-4 pr-4">
                <div class="grow">
                    <img src="/icon.png" class="h-10"/>
                </div>
                <div class="w-8">
                    <IconClose @click="toggleShowMenu" class="text-red-400 cursor-pointer hover:opacity-60" />
                </div>
            </div>
            <ol class="">
                <li class="border-b px-4 py-6">
                    <p class="font-semibold">About</p>
                    <p class="text-gray-900">
                        Kampa.ng is the modern campus magazine
                        providing the best social content that's focused on Nigerian Universities for students to
                        enjoy, stay informed, and become smarter.
                    </p>
                    <RouterLink to="/about" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Learn more
                    </RouterLink>
                </li>
                <li v-if="!authStore.cid" class="border-b px-4 py-6">
                    <RouterLink to="/subscribe" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Subsribe for FREE
                    </RouterLink>
                </li>
                <li v-if="!authStore.cid" class="border-b px-4 py-6">
                    <RouterLink to="/login" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Login
                    </RouterLink>
                </li>
                <li v-if="authStore.cid" class="border-b px-4 py-6">
                    <RouterLink to="/archive" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        See all Vols.
                    </RouterLink>
                </li>
                <!-- <li v-if="authStore.cid" class="border-b px-4 py-6">
                    <RouterLink to="/referrer" class="border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Referral Info.
                    </RouterLink>
                </li>-->
                <li v-if="authStore.cid" class="border-b px-4 py-6">
                    <span @click="logout" class="cursor-pointer border-b border-red-600 hover:opacity-60 cursor-pointer">
                        Logout
                    </span>
                </li>
            </ol>
        </div>
    </div>
    <div class="bg-white border-b shadow-lg py-2">
        <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
            <Logo />
            <div class="pt-2.5 sm:pt-2.5 drop-shadow-lg space-x-4">
                <MenuIcon @click="toggleShowMenu" class="cursor-pointer hover:opacity-60 -mt-2"  />
            </div>
        </div>
    </div>
</template>