import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Create from "../views/Create.vue";
import Tags from "../views/Tags.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/posts/:id",
    name: "Details",
    component: Details,
    props: true
  },
  {
    path: "/tags/:tag",
    name: "Tags",
    component: Tags,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
