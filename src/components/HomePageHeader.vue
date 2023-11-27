<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthUser } from "@/stores/auth-userlogin";
import { useCartStore } from "../stores/cart-store";
const searchInput = ref("");
const authStore = useAuthUser();
const cartStore = useCartStore();
const showLogin = computed(() => {
  return !authStore.userName;
});

const showLogout = computed(() => {
  return authStore.userName;
});

const performSearch = () => {
  alert("ok");
};

const username = authStore.userName;
const userInfo = ref({
  FirstName: "",
  LastName: "",
  ContactAddress: "",
  Email: "",
});
const getInfoUser = async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/users/getuserbyusername/${username}`
    );
    console.log(response);

    if (response.status === 200) {
      userInfo.value = response.data;
    }
  } catch (error) {
    console.error("An error occurred while logging in:", error);
  }
};
const cartQuantity = computed(() => {
  return cartStore.cart.reduce((total, product) => total + product.quantity, 0);
});
console.log(cartQuantity);

onMounted(() => {
  getInfoUser();
});
</script>

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
            <router-link to="/carts/check">
              <font-awesome-icon
                icon="fas fa-cart-shopping"
                style="color: #04245d"
              />
              <span v-if="cartQuantity > 0">({{ cartQuantity }})</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- login.signup -->

      <div class="mt-2 text-center">
        <div class="btn-group">
          <button
            style="border: none"
            type="button"
            class="btn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <font-awesome-icon icon="fa-solid fa-list" size="xl" />
          </button>
          <div>
            <ul class="dropdown-menu">
              <li class="mb-3">
                <p style="font-size: 12px">{{ userInfo.Email }}</p>
              </li>
              <li v-if="!showLogin">
                <img :src="userInfo.ImageURL" width="50" alt="" />
                <p>Hi, {{ userInfo.FirstName + userInfo.LastName }}</p>
              </li>

              <!-- setting accounts -->
              <li>
                <span v-if="showLogout">
                  <router-link :to="{ name: 'login-page' }"
                    ><span
                      style="
                        font-size: 10px;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular',
                          'Lucida Grande', 'Lucida Sans Unicode', Geneva,
                          Verdana, sans-serif;
                      "
                      >MY ACCOUNT</span
                    ></router-link
                  >
                </span>
              </li>

              <!-- cart list -->
              <li>
                <span v-if="showLogout">
                  <router-link :to="{ name: 'login-page' }"
                    ><span
                      style="
                        font-size: 10px;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular',
                          'Lucida Grande', 'Lucida Sans Unicode', Geneva,
                          Verdana, sans-serif;
                      "
                      >ORDER PURCHASED</span
                    ></router-link
                  >
                </span>
              </li>
              <li>
                <span v-if="showLogin">
                  <router-link :to="{ name: 'login-page' }"
                    ><span style="font-size: 13px">LOGIN</span></router-link
                  >
                </span>
              </li>
              <li>
                <span v-if="showLogout">
                  <router-link :to="{ name: 'login-page' }"
                    ><span style="font-size: 13px">LOG OUT</span></router-link
                  >
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

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
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

input.form-control:focus {
  border-color: #152332;
  box-shadow: 0 0 0 0.2rem rgba(0, 3, 7, 0.25);
}
btn-search:hover {
  background-color: #fff;
}

/* menu-login/setting */
.dropdown-menu {
  line-height: 1.5;
  width: 300px;
  padding: 15px;
  text-align: center;
  border-radius: 13px;
}
.dropdown-menu img {
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
