<template>
  <header>
    <theHeader />
  </header>

  <main>
    <!-- process at cart list -->
    <router-link to="/carts">
      <div class="process" style="max-width: 100%">
        <div class="border border-bottom mt-5 z-1"></div>
        <font-awesome-icon
          class="z-2 rounded-5 cart-shopping-process"
          icon="fa-solid fa-bag-shopping"
          size="xl"
          style="color: #3da9fc"
        />
      </div>
    </router-link>

    <!-- list cart -->
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
                    style="max-width: 50px"
                    :src="record.ImageURL"
                    :title="record.Name"
                    alt=""
                  />
                </div>
                <div>{{ record.name || "N/A" }}</div>
              </td>
              <td>{{ record.price || "N/A" }}</td>
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
                    v-model="record.quantity"
                    @input="updateTotal(record)"
                  />
                  <button
                    @click="incrementQuantity(record)"
                    :disabled="loading"
                  >
                    +
                  </button>
                </div>
              </td>
              <td style="color: red">
                <sup><u>đ</u></sup
                >{{ record.price * record.Quantity }}.000
              </td>
              <td>
                <button @click="deleteProduct(index)" :disabled="loading">
                  Delete
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
    <router-view></router-view>
  </main>

  <!-- show products cus can like -->
  <div>
    <div><h4>YOU MAY ALSO LIKE</h4></div>
    <div></div>
  </div>
  <hr />
  <footer class="mt-5">
    <theFooter />
  </footer>
</template>

<script setup>
import theHeader from "@/components/HomePageHeader.vue";
import theFooter from "@/components/Footer.homepage.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectAll = ref(false);
const showTable = ref(true);
const products = ref([]);
const totalPages = ref(0);

const getCartFromLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    products.value = storedCart.map((item) => {
      return {
        id: item.id,
        name: item.name || "N/A",
        price: item.price || 0,
        Quantity: item.Quantity || 0,
        quantity: item.quantity || 0,
      };
    });
    totalPages.value = 1; // Nếu bạn có số trang trong giỏ hàng, bạn cần cập nhật lại
    selectAll.value = false;
    showTable.value = products.value.length > 0;
  } else {
    showTable.value = false;
    router.push("Carts/empty");
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

<style scoped>
@import url("@/assets/pages/cart.homepage.css");
</style>
