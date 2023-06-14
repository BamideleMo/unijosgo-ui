import { createRouter, createWebHistory } from "vue-router";
import VolumeView from "../views/VolumeView.vue";
import IssuesView from "../views/IssuesView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AboutView from "../views/AboutView.vue";
import PostView from "../views/admin/PostView.vue";
import AllPostsView from "../views/admin/AllPostsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import LoadingIssueView from "../views/LoadingIssueView.vue";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../store/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        loggedIn: true,
      },
    },
    {
      path: "/home",
      redirect: "/",
      meta: {
        loggedIn: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
      meta: {
        loggedIn: true,
      },
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
      path: "/volume/:id",
      name: "volume",
      component: VolumeView,
      meta: {
        requiresUserAuth: true,
      },
    },
    {
      path: "/volume",
      name: "loading",
      component: LoadingIssueView,
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
      path: "/home",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.requiresAdminAuth && authStore.user_category !== "admin") {
    return {
      path: "/home",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.loggedIn && authStore.cid) {
    return {
      path: "/volume",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
