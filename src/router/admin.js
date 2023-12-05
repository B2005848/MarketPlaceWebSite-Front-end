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

      // Products
      {
        path: "products",
        name: "admin-products",
        component: () => import("../pages/admin/products/index.vue"),
        meta: { title: "Shineonyou | Admin | Products" },
      },

      // product variants
      {
        path: "product/variants/:id",
        name: "product-variants",
        component: () => import("../pages/admin/products/product.variants.vue"),
        meta: { title: "Shineonyou | Admin | Variants Product" },
      },
      // add a new product

      {
        path: "products/add/",
        name: "products-add",
        component: () => import("../pages/admin/products/add.product.vue"),
        meta: { title: "Shineonyou | Admin | Add Products" },
      },

      // add a new variant of product
      {
        path: "products/add/variant/:id",
        name: "products-add-var",
        component: () => import("../pages/admin/products/add.var.products.vue"),
        meta: { title: "Shineonyou | Admin | Add Variantion Products" },
      },
      // edit
      {
        path: "products/edit-variant/:id",
        name: "products-edit-var",
        component: () => import("../pages/admin/products/edit.products.vue"),
        meta: { title: "Shineonyou | Admin | Edit Products" },
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
