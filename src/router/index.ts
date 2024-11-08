import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import("@/views/JobsView.vue"),
  },
  {
    path: "/jobs/:id",
    name: "job",
    component: () => import("@/views/JobView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;