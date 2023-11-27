<style scoped>
.info {
  background-color: aliceblue;
}

form .row div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  font-family: sans-serif;
}

.btn-place-order {
  margin-top: 50px;
  padding: 20px 70px 20px 40px;
  border-radius: 13px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  font-weight: bold;
}

.btn-place-order:hover {
  background-color: antiquewhite;
}
</style>

<template>
  <div class="checkout-form row m-3">
    <div class="border-end col info">
      <form @submit.prevent="order" class="m-5">
        <div>
          <!-- FIRSTNAME -->
          <div class="row">
            <div class="col-sm-6">
              <label for="first-name" class="form-label"
                >First Name <span class="text-danger">*</span></label
              >
              <input
                v-model="userInfo.FirstName"
                type="text"
                id="first-name"
                class="form-control"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <!-- LASTNAME -->
            <div class="col-sm-6">
              <label for="last-name" class="form-label"
                >Last Name <span class="text-danger">*</span></label
              >
              <input
                v-model="userInfo.LastName"
                type="text"
                id="last-name"
                class="form-control"
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>

            <!-- NUMBERPHONE -->
            <div class="mt-2">
              <label for="phone" class="form-label"
                >Number phone <span class="text-danger">*</span></label
              >
              <input
                type="tel"
                id="phone"
                class="form-control"
                required
                pattern="[0-9]{10}"
              />
              <div class="invalid-feedback">Your phone number is required.</div>
            </div>

            <!-- EMAIL -->
            <div class="mt-2">
              <label for="email" class="form-label">Email (Optional)</label>
              <input
                v-model="userInfo.Email"
                type="email"
                id="email"
                class="form-control"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <!-- ADDRESS -->
            <div class="mt-2">
              <label for="address" class="form-label"
                >Address <span class="text-danger">*</span></label
              >
              <input
                v-model="userInfo.ContactAddress"
                type="text"
                id="address"
                class="form-control"
              />
              <div class="invalid-feedback">
                Please enter your shipping address..
              </div>
            </div>

            <div class="mt-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  name="paymentMethod"
                  type="radio"
                  value="COD"
                  id="cod"
                />
                <label class="form-check-label" for="cod">
                  Cash on Delivery (COD)
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  name="paymentMethod"
                  type="radio"
                  value="BANKING"
                  id="banking"
                />
                <label class="form-check-label" for="banking"> Banking </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Phần tóm tắt đơn hàng -->
    <div class="col Summary-Order">
      <div class="mb-5">
        <h4>Order Summary</h4>
        <ul>
          <li v-for="(product, index) in cartStore.cart" :key="index">
            {{ product.name }} x{{ product.Quantity }} -
            {{ currencyStore.formatCurrency(product.price * product.Quantity) }}
          </li>
        </ul>
        <div>
          <b>TOTAL PRICE:</b>
          {{ currencyStore.formatCurrency(cartStore.totalPrice) }}
        </div>
      </div>

      <div class="button-place-order text-center">
        <button type="submit" class="btn-place-order">
          <i>PLACE ORDER</i>
          <span
            ><font-awesome-icon
              icon="fas fa-clipboard-check"
              beat
              size="lg"
              style="color: #5d8fe5"
              class="ms-3"
          /></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthUser } from "@/stores/auth-userlogin.js";
import { onMounted, ref } from "vue";
import { useCartStore } from "../../stores/cart-store.js";

// Trong component của bạn
import { useCurrencyStore } from "@/stores/define-vnd.js";

const currencyStore = useCurrencyStore();

const cartStore = useCartStore();

const useStore = useAuthUser();
const username = useStore.userName;
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

    if (response.status === 200) {
      userInfo.value = response.data;
    }
  } catch (error) {
    console.error("An error occurred while logging in:", error);
  }
};

onMounted(() => {
  getInfoUser();
});
</script>
