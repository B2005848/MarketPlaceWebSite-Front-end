const admin = [
  // url for admin page
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../layouts/Admin.login.vue"),
    meta: { title: "Shineonyou | Admin | Login" },
  },

  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
    meta: { title: "Admin Page" },
    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../pages/admin/dashboard/index.vue"),
        meta: { title: "Shineonyou | Admin | Dashboard" },
      },
      // Accounts
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/users/index.vue"),
        meta: { title: "Shineonyou | Admin | Accounts" },
      },
      {
        path: "users/details/:username",
        name: "admin-usersdetails",
        component: () => import("../pages/admin/users/users.details.vue"),
        meta: { title: "Shineonyou | Admin | AccountsDetails" },
      },
      {
        path: "users/details/products/:username",
        name: "admin-usersdetails-products",
        component: () => import("../pages/admin/users/users.products.vue"),
        meta: { title: "Shineonyou | Admin | AccountsDetails - Products" },
      },

      {
        path: "products",
        name: "admin-products",
        component: () => import("../pages/admin/products/index.vue"),
        meta: { title: "Shineonyou | Admin | Products" },
      },
      {
        path: "oders",
        name: "admin-oders",
        component: () => import("../pages/admin/oders/index.vue"),
        meta: { title: "Shineonyou | Admin | Oders" },
      },
      {
        path: "tags",
        name: "admin-tags",
        component: () => import("../pages/admin/tags/index.vue"),
        meta: { title: "Shineonyou | Admin | Tags" },
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("../pages/admin/settings/index.vue"),
        meta: { title: "Shineonyou | Admin | Settings" },
      },
    ],
  },
];

export default admin;
