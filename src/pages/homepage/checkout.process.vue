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
      <form class="m-5">
        <div class="row">
          <div class="col-sm-6">
            <label for="first-name" class="form-label"
              >First Name <span class="text-danger">*</span></label
            >
            <input
              disabled
              v-model="userInfo.FirstName"
              type="text"
              id="first-name"
              class="form-control"
            />
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>

          <div class="col-sm-6">
            <label for="last-name" class="form-label"
              >Last Name <span class="text-danger">*</span></label
            >
            <input
              disabled
              v-model="userInfo.LastName"
              type="text"
              id="last-name"
              class="form-control"
            />
            <div class="invalid-feedback">Valid last name is required.</div>
          </div>

          <div class="mt-2">
            <label for="phone" class="form-label"
              >Number phone <span class="text-danger">*</span></label
            >
            <input
              v-model="phone"
              type="tel"
              id="phone"
              class="form-control"
              required
              pattern="[0-9]{10}"
            />
            <div class="invalid-feedback">Your phone number is required.</div>
          </div>

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

          <div class="mt-2">
            <label for="address" class="form-label"
              >Address <span class="text-danger">*</span></label
            >
            <input
              v-model="userInfo.ContactAddress"
              type="text"
              id="address"
              class="form-control"
              disabled
            />
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div class="mt-4">
            <div class="form-check">
              <input
                class="form-check-input"
                name="paymentMethod"
                type="radio"
                value="1"
                id="cod"
                @change="updatePaymentMethodID(1)"
                :checked="paymentMethodID === 1"
              />
              <label class="form-check-label" for="cod"
                >Cash on Delivery (COD)</label
              >
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                name="paymentMethod"
                type="radio"
                value="2"
                id="banking"
                @change="updatePaymentMethodID(2)"
                :checked="paymentMethodID === 2"
              />
              <label class="form-check-label" for="banking">Banking</label>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="col Summary-Order">
      <div class="mb-5">
        <h4>Order Summary</h4>
        <ul>
          <li v-for="(product, index) in cartStore.cart" :key="index">
            {{ product.name }} "{{ product.material }}"" x{{ product.Quantity }}
            -
            {{ currencyStore.formatCurrency(product.price * product.Quantity) }}
          </li>
        </ul>
        <div>
          <b>TOTAL PRICE:</b>
          {{ currencyStore.formatCurrency(cartStore.totalPrice) }}
        </div>
      </div>

      <div class="button-place-order text-center">
        <button type="button" @click="order" class="btn-place-order">
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
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cart-store.js";
import { useCurrencyStore } from "@/stores/define-vnd.js";

const currencyStore = useCurrencyStore();
const cartStore = useCartStore();
const useStore = useAuthUser();
const router = useRouter();
const username = useStore.userName;
const userInfo = ref({
  UserID: "",
  FirstName: "",
  LastName: "",
  ContactAddress: "",
  Email: "",
});
const phone = ref("");
const paymentMethodID = ref(1);
const updatePaymentMethodID = (value) => {
  paymentMethodID.value = value;
};
const order = async () => {
  try {
    await getInfoUser(); // Fetch user information before placing the order

    const orderData = {
      userID: userInfo.value.UserID,
      Phone: phone.value,
      products: cartStore.cart.map((product) => ({
        ProductID: product.id,
        VariantID: product.variantID,
        Quantity: product.Quantity,
      })),
      paymentMethodID: parseInt(paymentMethodID.value),
    };

    const response = await window.axios.post(
      "http://localhost:3000/api/products/orders/create",
      orderData
    );

    if (response.status === 201) {
      const orderID = response.data.order[0];
      console.log("Order placed successfully:", orderID);
      router.push(`/carts/completed?orderID=${orderID}`);
    } else {
      console.error("Failed to place order:", response.data.message);
    }
  } catch (error) {
    console.error("An error occurred while submitting the order", error);
  }
};

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
