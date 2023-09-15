import { createRouter, createWebHistory } from "vue-router";
import GistView from "../views/GistView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AboutView from "../views/AboutView.vue";
import ArchiveView from "../views/ArchiveView.vue";
import PostView from "../views/admin/PostView.vue";
import AllPostsView from "../views/admin/AllPostsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import DisclaimerView from "../views/DisclaimerView.vue";
import PhoneChangedView from "../views/PhoneChangedView.vue";
import VerifyView from "../views/VerifyView.vue";
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
    // {
    //   path: "/home",
    //   redirect: "/",
    //   meta: {
    //     loggedIn: true,
    //   },
    // },
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
      path: "/changed",
      name: "changed",
      component: PhoneChangedView,
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyView,
      meta: {
        loggedIn: true,
      },
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
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
  const userStore = useUserStore();

  if (to.meta.requiresUserAuth && !userStore.cid) {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.requiresAdminAuth && userStore.user_category !== "admin") {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.loggedIn && userStore.cid) {
    return {
      path: "/gist",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
