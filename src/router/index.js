import { createRouter, createWebHistory } from "vue-router";
import GistView from "../views/GistView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import ReferrerView from "../views/ReferrerView.vue";
import ReferredByView from "../views/ReferredByView.vue";
import AboutView from "../views/AboutView.vue";
import ArchiveView from "../views/ArchiveView.vue";
import PostView from "../views/admin/PostView.vue";
import AllPostsView from "../views/admin/AllPostsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import DisclaimerView from "../views/DisclaimerView.vue";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../store/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/disclaimer",
      name: "disclaimer",
      component: DisclaimerView,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/referral",
      name: "referrer",
      component: ReferrerView,
    },
    {
      path: "/referred-by",
      name: "referredby",
      component: ReferredByView,
    },
    {
      path: "/admin/post",
      name: "post",
      component: PostView,
      meta: {
        requiresAdminAuth: true,
      },
    },
    {
      path: "/admin/all-posts",
      name: "posts",
      component: AllPostsView,
    },
    {
      path: "/gist",
      name: "gist",
      component: GistView,
      meta: {
        requiresUserAuth: true,
      },
    },
    {
      path: "/archive",
      name: "archive",
      component: ArchiveView,
      meta: {
        requiresUserAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not_found",
      component: PageNotFoundView,
    },
  ],
});

router.beforeEach((to, from) => {
  window.scrollTo(0, 0);
  const authStore = useUserStore();

  if (to.meta.requiresUserAuth && !authStore.cid) {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.requiresAdminAuth && authStore.user_category !== "admin") {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.loggedIn && authStore.cid) {
    return {
      path: "/gist",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
