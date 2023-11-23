// auth-admin.js
import { defineStore } from "pinia";

export const useAuthUser = defineStore("auth-admin", {
  state: () => ({
    isAuthenticated: false,
    userName: "",
  }),
  actions: {
    login(name) {
      this.isAuthenticated = true;
      this.userName = name;
    },

    logout() {
      this.isAuthenticated = false;
      this.userName = "";
    },
  },
});
