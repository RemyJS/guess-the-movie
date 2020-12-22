import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/views/MainPage";
import SettingPage from "@/views/SettingPage";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/setting",
    component: SettingPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
