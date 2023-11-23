import { createRouter, createWebHashHistory } from "vue-router";
import admin from "./admin";
import homepage from "./homepage";
import notfound from "./notfound";
const routes = [...admin, ...homepage, ...notfound];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? "Error 404 - Page Not Found!";
  next();
});
export default router;
