import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/ContactsView.vue"),
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: ":id",
          component: () => import("../views/ContactView.vue"),
        },
      ],
    },

    {
      path: "/contacts/new",
      name: "create-contact",
      component: () => import("../views/CreateContactView.vue"),
    },
  ],
});

export default router;
