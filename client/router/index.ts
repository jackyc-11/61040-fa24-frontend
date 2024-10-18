import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import AddFriends from "@/components/Friends/AddFriends.vue";
import FriendRequests from "@/components/Friends/FriendRequests.vue";
import FriendsList from "@/components/Friends/FriendsList.vue";
import { useUserStore } from "@/stores/user";
import FriendsView from "@/views/FriendsView.vue";
import LoginView from "../views/LoginView.vue";
import MessagesView from "../views/MessagesView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/messages",
      name: "Messages",
      component: MessagesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const userStore = useUserStore();
        const { isLoggedIn } = storeToRefs(userStore);
        if (isLoggedIn.value) {
          return { name: "Messages" };
        }
      },
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendsView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "list",
          component: FriendsList,
        },
        {
          path: "add",
          component: AddFriends,
        },
        {
          path: "requests",
          component: FriendRequests,
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/",
      redirect: "/messages",
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
