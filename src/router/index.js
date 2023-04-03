import { createRouter, createWebHistory } from "vue-router";
import IssueView from "../views/IssueView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AboutView from "../views/AboutView.vue";
import SubscribeView from "../views/SubscribeView.vue";
import SignInView from "../views/SignInView.vue";
import PostView from "../views/admin/PostView.vue";
import AllPostsView from "../views/admin/AllPostsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import LoadingIssueView from "../views/LoadingIssueView.vue";
import UnauthorizedView from "../views/UnauthorizedView.vue";
import { useUserStore } from "../store/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/issue",
    },
    {
      path: "/home",
      redirect: "/issue",
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: SubscribeView,
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
      path: "/sign-in",
      name: "signin",
      component: SignInView,
      meta: {
        loggedIn: true,
      },
      afterEach: (to, from, next) => {
        next({ path: "/about" });
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
      path: "/issue/:id",
      name: "issue",
      component: IssueView,
    },
    {
      path: "/issue",
      name: "no_issue",
      component: LoadingIssueView,
    },
    {
      path: "/unsubscribed/:id",
      name: "un_authorized",
      component: UnauthorizedView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not_found",
      component: PageNotFoundView,
    },
    // {
    //   path: "*",
    //   redirect: "/404"
    // }
  ],
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (to.meta.requiresUserAuth && !userStore.uuser_id) {
    return {
      path: "/subscribe",
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
