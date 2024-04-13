import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import StoreItem from "./components/StoreItem.vue";
import Electronics from "./components/Electronics.vue";
import Clothing from "./components/Clothing.vue";
import BestSeller from "./components/BestSeller.vue";
import Groceries from "./components/Groceries.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: "/bestseller",
    name: "best sellers",
    props: true,
    component: BestSeller,
  },
  {
    path: "/clothing",
    name: "clothing",
    props: true,
    component: Clothing,
  },
  {
    path: "/electronics",
    name: "electronics",
    props: true,
    component: Electronics,
  },
  {
    path: "/groceries",
    name: "groceries",
    props: true,
    component: Groceries,
  },
  {
    path: '/item/:id', // Adjust the path as per your requirement
    name: 'Item',
    component: StoreItem,
    props: true
  },
  // you need to add more routes here
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
