import { createWebHistory, createRouter } from "vue-router";

import ContactBook from "../views/ContactBook.vue";
import AddContact from "../views/AddContact.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/add",
    name: "add-contact",
    component: AddContact,
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("../views/ContactEdit.vue"),
    props: true,
  },

  // ✅ THÊM 2 ROUTE NÀY
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },

  // 404 phải để cuối
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;