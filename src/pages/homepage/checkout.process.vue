<template>
  <div class="checkout-form row m-3">
    <div class="border-end col m-3">
      <form>
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
    <div class="col">
      <h4>Order Summary</h4>
      <ul>
        <li v-for="(product, index) in products" :key="index">
          {{ product.name }} x{{ product.Quantity }} -
          {{ product.price * product.Quantity }}.000<sub>đ</sub>
        </li>
      </ul>
      <div>Total: .000<sub>đ</sub></div>
      <button>Place Order</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthUser } from "@/stores/auth-userlogin.js";
import { onMounted, ref } from "vue";

const useStore = useAuthUser();
const username = useStore.userName;
const userInfo = ref({
  FirstName: "",
  LastName: "",
  ContactAddress: "",
  Email: "",
});
const products = ref([]);
const getCartFromLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  console.log("Stored Cart: ", storedCart);

  if (storedCart) {
    products.value = storedCart.map((item) => {
      return {
        id: item.id,
        Image: item.Image,
        name: item.name || "N/A",
        price: item.price || 0,
        Quantity: item.Quantity || 1,
        quantity: item.quantity || 0,
      };
    });
  } else {
    products.value = [];
  }
};

// const placeOrder = () => {
//   // Xử lý đặt hàng ở đây
//   console.log("Placing order...");
// };

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
  getCartFromLocalStorage();
});
</script>
