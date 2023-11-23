<script setup>
import { useAuthAdmin } from "@/stores/auth-admin";
import theHeader from "@/components/Ad_theHeader.vue";
import theMenu from "@/components/Ad_theMenu.vue";
import { useRouter } from "vue-router";

const authStore = useAuthAdmin();
const router = useRouter();

if (!authStore.isAuthenticated) {
  router.push({ name: "admin-login" });
}
</script>

<template>
  <div>
    <theHeader />

    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-sm-2">
          <div class="border border-start-0 border-top-0">
            <theMenu />
          </div>
        </div>

        <div class="col-sm-10">
          <!-- render route children -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
