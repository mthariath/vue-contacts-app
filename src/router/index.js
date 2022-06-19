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
          path: "new",
          component: () => import("../views/CreateContactView.vue"),
        },
        {
          path: ":id",
          component: () => import("../views/ContactView.vue"),
        },
        {
          path: ":id/edit",
          component: () => import("../views/EditContactView.vue"),
        },
      ],
    },
  ],
});

export default router;
