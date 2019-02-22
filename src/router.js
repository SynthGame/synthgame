import Vue from "vue";
import Router from "vue-router";
import Home from "./views/HomeView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: '/play/game'
    },
    {
      path: "/",
      redirect: '/play/game'
    },
    {
      path: "/play/:user_id",
      name: "home",
      component: Home
    },
    {
      path: "/tats",
      name: "tats",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/AboutView.vue")
    },
    {
      path: "/jobboard",
      name: "jobboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/JobBoard.vue")
    },
    {
      path: "/contribution",
      redirect: "/contribution/synth",
    },
    {
      path: "/contribution/:contribution_id",
      name: "contribution",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ContributionView.vue")
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
        // , offset: { x: 0, y: 10 }
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
