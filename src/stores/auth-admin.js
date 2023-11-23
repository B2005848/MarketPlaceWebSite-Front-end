// auth-admin.js
import { defineStore } from "pinia";

export const useAuthAdmin = defineStore("auth-admin", {
  state: () => ({
    isAuthenticated: false,
    adminName: "",
  }),
  actions: {
    login(name) {
      this.isAuthenticated = true;
      this.adminName = name;
    },

    logout() {
      this.isAuthenticated = false;
      this.adminName = "";
    },
  },
});
