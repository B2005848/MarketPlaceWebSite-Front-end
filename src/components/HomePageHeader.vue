<template>
  <!-- item-header 1 -->
  <header>
    <div class="container-fluid">
      <div class="note-header text-center pt-1 pb-1">
        <span
          ><font-awesome-icon
            icon="fa-solid fa-circle"
            beat-fade
            size="2xs"
            style="color: #d6f538"
          />
          Shine On You - "Browsing with Confidence, Marketplace with a
          Difference"</span
        >
      </div>
    </div>

    <!-- menu -->
    <!-- item-header 2 -->
    <div class="item-header-2">
      <!-- logo-home -->
      <div class="p-2 d-flex justify-content-center align-items-center">
        <router-link to="/">
          <span
            ><img src="../assets/logohome.svg" width="50" alt="" />
            SHINEONYOU</span
          ></router-link
        >
      </div>

      <!-- input-search -->
      <div class="p-2 d-flex justify-content-left align-items-center">
        <input
          class="form-control"
          list="datalistOptions"
          placeholder="Type to search..."
          v-model="searchInput"
          @keyup.enter="performSearch"
          size="500"
        />
        <datalist id="datalistOptions">
          <option value="San Francisco"></option>
          <option value="New York"></option>
          <option value="Seattle"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
        </datalist>
      </div>

      <!-- cart -->
      <div class="p-2">
        <!-- note / cart -->
        <div>
          <font-awesome-icon class="me-2" icon="fa-regular fa-bell" />
          <span style="font-size: 15px">Notifications</span>

          <font-awesome-icon
            class="me-2 ms-3"
            icon="fa-regular fa-circle-question"
          />
          <span style="font-size: 15px">Help</span>

          <!-- cart -->
          <div class="me-3">
            <router-link to="/carts">
              <font-awesome-icon
                icon="fas fa-cart-shopping"
                style="color: #04245d"
              />
              <span>(1)</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- login.signup -->
      <div class="mt-2">
        <span class="me-3"
          ><h3 style="color: #3da9fc">Hi,</h3>
          {{ authStore.userName }}</span
        >
        <span v-if="showLogin" class="me-3">
          <router-link to="accounts/login"
            ><span style="font-size: 12px">Login</span></router-link
          >
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthUser } from "@/stores/auth-userlogin";
const searchInput = ref("");
const authStore = useAuthUser();
const showLogin = computed(() => {
  return !authStore.userName;
});

const performSearch = () => {
  alert("ok");
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  color: #000000;
  font-weight: 700;
}

a {
  text-decoration: none;
}
.container-fluid {
  background-color: #ef4565;
}

/* header1 */
.container-fluid span {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(
    90deg,
    #1d1819,
    #4e1a13,
    #3a300e,
    #3a440f,
    #313d3b
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.item-header-2 {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 0.2fr;
}

input.form-control {
  font-size: 15px;
  padding-left: 15px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid #ccc; /* Màu viền mặc định */
  transition: border-color 0.3s;
}

input.form-control:focus {
  border-color: #152332;
  box-shadow: 0 0 0 0.2rem rgba(0, 3, 7, 0.25);
}
btn-search:hover {
  background-color: #fff;
}
</style>
