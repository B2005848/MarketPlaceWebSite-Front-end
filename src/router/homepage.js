const homepage = [
  // url for admin page
  {
    path: "/",
    name: "Homepage",
    component: () => import("../layouts/homepage.vue"),
    meta: {
      title: "Shineonyou",
    },
  },

  {
    path: "/carts",
    name: "Cart",
    component: () => import("../layouts/cart.vue"),
    meta: {
      title: "Shineonyou | Shopping Cart",
    },
    children: [
      {
        path: "check",
        name: "Cart-list",
        component: () => import("../pages/homepage/cart.process.vue"),
        meta: {
          title: "Shineonyou | Cart",
        },
      },
      {
        path: "checkout",
        name: "Cart-checkout",
        component: () => import("../pages/homepage/checkout.process.vue"),
        meta: {
          title: "Shineonyou | Checkout",
        },
      },
      {
        path: "empty",
        name: "Cart-empty",
        component: () => import("../pages/homepage/page.empty.cart.vue"),
        meta: {
          title: "Shineonyou | Your Cart Empty",
        },
      },
    ],
  },

  {
    path: "/accounts",
    name: "Login",
    component: () => import("../layouts/login.vue"),
    meta: {
      title: "Shineonyou - Đăng nhập/ Đăng kí",
    },
    children: [
      {
        path: "login",
        name: "login-page",
        component: () => import("../pages/login/index.vue"),
        meta: {
          title: "Shineonyou - Login",
        },
      },

      {
        path: "sign-up",
        name: "signup",
        component: () => import("../pages/sign-up/index.vue"),
        meta: {
          title: "Shineonyou - Sign up",
        },
      },
    ],
  },
];

export default homepage;
