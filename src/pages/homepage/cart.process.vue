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
          <tr v-for="(record, index) in products" :key="index">
            <td>
              <!-- check to checkout -->
              <input
                type="checkbox"
                v-model="record.isSelected"
                :disabled="loading"
              />
            </td>
            <td>
              <div>
                <img
                  class="mb-2"
                  style="max-width: 50px"
                  :src="record.Image"
                  :title="record.Name"
                  alt=""
                />
              </div>
              <div>{{ record.name || "N/A" }}</div>
            </td>
            <td>{{ record.price || "N/A" }}.000<sub>đ</sub></td>
            <td>
              <div>
                <button
                  @click="decrementQuantity(record)"
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
                <button @click="incrementQuantity(record)" :disabled="loading">
                  +
                </button>
              </div>
            </td>
            <td style="color: red">
              <sup><u>đ</u></sup
              >{{ record.price * record.Quantity }}.000
            </td>
            <td>
              <button
                class="border-0"
                @click="deleteProduct(index)"
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
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthUser } from "@/stores/auth-userlogin.js";
const authuser = useAuthUser();
const showchecklogin = ref(false);
const router = useRouter();
const selectAll = ref(false);
const showTable = ref(true);
const products = ref([]);
const loading = ref();

const checkout = () => {
  if (!authuser.userName) {
    showchecklogin.value = true;
  } else {
    showchecklogin.value = false;
    router.push("/carts/checkout");
  }
};

const getCartFromLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  console.log("Stored Cart: ", storedCart);
  if (storedCart.length > 0) {
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
    selectAll.value = false;
    showTable.value = products.value.length > 0;
  } else {
    showTable.value = products.value.length > 0;
    console.log("No stored cart data");
    router.push("empty");
  }
};

// Insert Quantity
const incrementQuantity = (record) => {
  record.Quantity++;
  updateLocalStorage();
};

const decrementQuantity = (record) => {
  if (record.Quantity > 1) {
    record.Quantity--;
    updateLocalStorage();
  }
};

const calculateTotal = computed(() => {
  return products.value.map((record) => {
    const total = record.Price * record.Quantity;
    record.Total = total;
    return total;
  });
});

watch(
  () => calculateTotal.value,
  (newTotal) => {
    console.log("calculateTotal changed:", newTotal);
    updateLocalStorage();
  }
);

const updateTotal = (record) => {
  record.Total = record.Quantity * record.Price;
  updateLocalStorage();
};

// delete products button
const deleteProduct = (index) => {
  products.value.splice(index, 1);
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(products.value));
};

onMounted(() => {
  getCartFromLocalStorage();
});
</script>
