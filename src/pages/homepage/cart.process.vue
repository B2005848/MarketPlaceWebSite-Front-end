<style scoped>
td {
  vertical-align: middle;
}

.checkout button {
  color: rgb(255, 255, 255);
  font-size: large;
  font-weight: bold;
  border-radius: 13px;
  padding: 15px 50px 15px 50px;
  background-color: #ef4565;
}

.checkout button:hover {
  background-color: #fa5e78;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
  margin-right: 15px;
}

.total-quantity,
.total-price {
  font-weight: bold;
  font-size: 18px;
}

.total-price {
  color: red;
}
</style>
<template>
  <!-- list cart -->
  <div v-if="showTable" class="cart-list">
    <div class="table-responsive">
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th>
              Select all
              <input
                class="me-3"
                type="checkbox"
                v-model="selectAll"
                @change="selectAllRows"
                :disabled="loading"
              />
            </th>
            <th>Products</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in cartStore.cart" :key="index">
            <td>
              <!-- check to checkout -->
              <input
                type="checkbox"
                v-model="record.isSelected"
                :disabled="loading"
                @change="updateSelectedProducts"
              />
            </td>
            <td>
              <div>
                <img
                  class="mb-2"
                  style="max-width: 50px"
                  :src="record.Image"
                  :title="record.name"
                  alt=""
                />
              </div>
              <div>{{ record.name || "N/A" }}</div>
            </td>
            <td>{{ formatCurrency(record.price) }}</td>
            <td>
              <div>
                <button
                  @click="cartStore.decrementQuantity(record)"
                  :disabled="record.Quantity <= 1 || loading"
                >
                  -
                </button>
                <input
                  class="text-center"
                  size="1"
                  type="text"
                  v-model="record.Quantity"
                  @input="updateTotal(record)"
                />
                <button
                  @click="cartStore.incrementQuantity(record)"
                  :disabled="loading"
                >
                  +
                </button>
              </div>
            </td>
            <td style="color: red">{{ formatCurrency(record.Total) }}</td>
            <td>
              <button
                class="border-0"
                @click="cartStore.deleteProduct(index)"
                :disabled="loading"
              >
                <font-awesome-icon
                  icon="fa-regular fa-trash-can"
                  style="color: #df0707"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="loading" class="text-center mt-3">
    <span class="spinner-border text-primary"></span>
  </div>
  <div class="cart-summary">
    <div class="total-quantity">
      Total Quantity: {{ cartStore.selectedQuantity }}
    </div>
    <div class="total-price">
      Total Price: {{ formatCurrency(cartStore.totalPrice) }}
    </div>
  </div>

  <!-- if products empty render page null products -->
  <div class="checkout text-end mb-3 me-3 mt-5">
    <button @click="checkout" class="btn-checkout" :disabled="loading">
      <font-awesome-icon
        color="#fffffe"
        class="me-3"
        icon="fas fa-money-bill"
        size="lg"
      />
      GO TO CHECKOUT
    </button>
  </div>

  <span v-if="showchecklogin">Please login to go to checkout page</span>
  <div>
    <div><h4>YOU MAY ALSO LIKE</h4></div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthUser } from "@/stores/auth-userlogin.js";
import { useCartStore } from "../../stores/cart-store.js";

const authuser = useAuthUser();
const cartStore = useCartStore();
const showchecklogin = ref(false);
const router = useRouter();
const selectAll = ref(false);
const showTable = ref(true);
console.log(cartStore);
const loading = ref();
const checkout = () => {
  if (!authuser.userName) {
    showchecklogin.value = true;
  } else {
    showchecklogin.value = false;
    const selectedProducts = cartStore.cart.filter(
      (product) => product.isSelected
    );

    cartStore.updateCart(selectedProducts);

    router.push("/carts/checkout");
  }
};

const updateTotal = (record) => {
  if (record && record.Quantity !== undefined) {
    record.Total = record.Quantity * record.price;
    record.TotalFormatted = formatCurrency(record.Total);
    cartStore.updateProduct(record); // Cập nhật store với thông tin sản phẩm mới
    cartStore.updateTotalPrice(record); // Cập nhật total price trong store
  } else {
    console.error("Invalid record or Quantity:", record);
  }
};

const calculateTotal = computed(() =>
  cartStore.cart.map((record) => record.price * record.Quantity)
);

watch(calculateTotal, (newTotal) => {
  console.log("New total:", newTotal);
});

// define VND
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const selectAllRows = () => {
  cartStore.cart.forEach((product) => {
    product.isSelected = selectAll.value;
  });
};
</script>
