import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import guest from "./middleware/guest";
import auth from "./middleware/auth";

import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import Movies from "@/components/Movies";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "/dashboard/movies",
        name: "dashboard.movies",
        component: Movies,
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const middlewarePipeline = (context, middleware, index) => {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
};

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});
export default router;
