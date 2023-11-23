<template>
  <div class="container-fluid">
    <div class="title-header row p-3">
      <!-- logo -->
      <div class="col-sm-9 d-flex align-items-center">
        <font-awesome-icon icon="fas fa-key" />
        <span class="ms-2">Administrator Page</span>
      </div>

      <!-- account -->
      <div
        class="col-sm-3 d-flex align-items-center justify-content-sm-end position-relative"
      >
        <button class="btn" data-bs-toggle="dropdown">
          <font-awesome-icon
            icon="fa-solid fa-bars-staggered"
            style="color: #ffffff"
            size="xl"
          />
        </button>
        <ul class="dropdown-menu p-2">
          <li>
            <button class="dropdown-item">
              <span>Welcome, {{ authStore.adminName }}</span>
            </button>
          </li>
          <li>
            <router-link
              @click="logout"
              to="/admin/login"
              class="dropdown-item"
            >
              <font-awesome-icon
                class="me-2"
                icon="fa-solid fa-arrow-right-from-bracket"
                size="xs"
                style="color: #000000"
              />
              Log out
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthAdmin } from "@/stores/auth-admin";
import { useRouter } from "vue-router";

const authStore = useAuthAdmin();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/admin/login");
};
</script>

<!-- css -->
<style scoped>
.title-header {
  background-color: #6246ea;
  color: #fffffe;
}

a {
  color: #3da9fc;
}

.dropdown-menu {
  background-color: #c6dbf3;
  border-radius: 13px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.dropdown-menu span {
  font-family: sans-serif;
}

a:hover,
li:hover,
button.dropdown-item:hover {
  border-radius: 13px;
  background-color: rgb(255, 255, 255);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
