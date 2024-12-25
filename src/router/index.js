import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import LoginAdmin from "@/views/LoginAdmin.vue";

const routes = [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: ProductDetails, // 确保组件路径正确
  },
  {
    path: "/loginAdmin",
    name: "LoginAdmin",
    component: LoginAdmin, // 添加登录页面路由
  },
];

const router = createRouter({
  history: createWebHistory(), // 确保使用 history 模式
  routes,
});

export default router;
