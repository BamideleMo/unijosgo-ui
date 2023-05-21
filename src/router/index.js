import { createRouter, createWebHistory } from "vue-router";
import VolumeView from "../views/VolumeView.vue";
import IssuesView from "../views/IssuesView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AboutView from "../views/AboutView.vue";
import PostView from "../views/admin/PostView.vue";
import AllPostsView from "../views/admin/AllPostsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import LoadingIssueView from "../views/LoadingIssueView.vue";
import CallToActionView from "../views/CallToActionView.vue";
import { useUserStore } from "../store/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/volume",
    },
    {
      path: "/home",
      redirect: "/volume",
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
        requiresUserAuth: true,
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
    },
    {
      path: "/volume",
      name: "no_issue",
      component: LoadingIssueView,
    },
    {
      path: "/issues",
      name: "all_issues",
      component: IssuesView,
      meta: {
        requiresUserAuth: true,
      },
    },
    {
      path: "/call-to-action",
      name: "cta",
      component: CallToActionView,
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

  if (to.meta.requiresUserAuth && !userStore.uuser_id) {
    return {
      path: "/sign-in",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.requiresAdminAuth && userStore.role !== "admin") {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.loggedIn && userStore.uuser_id) {
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
