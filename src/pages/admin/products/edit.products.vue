<style scoped>
.container {
  justify-content: space-around;
}

form div {
  margin-top: 20px;
}

form input {
  width: 200px;
}
</style>
<template>
  <div class="container d-flex">
    <div class="row">
      <h1>Edit Product</h1>
      <form @submit.prevent="submitForm">
        <!-- name product -->
        <div>
          <label class="col-sm-2" for="name">Name</label>
          <input v-model="name" type="text" id="name" />
        </div>

        <!-- category product -->
        <div>
          <label class="col-sm-2" for="category">Category</label>
          <input v-model="category" type="text" id="category" />
        </div>

        <!-- quantity -->
        <div>
          <label class="col-sm-2" for="quantity">Quantity</label>
          <input v-model="quantity" type="number" id="quantity" />
        </div>

        <!-- price -->
        <div>
          <label class="col-sm-2" for="price">Price</label>
          <input v-model="price" type="number" id="price" />
        </div>

        <!-- description -->
        <div>
          <label class="col-sm-2" for="description">Description</label>
          <textarea v-model="description" id="description"></textarea>
        </div>

        <!-- image -->
        <div>
          <label class="col-sm-2" for="image">Image</label>
          <input type="file" id="image" @change="handleImageChange" />
        </div>
        <div class="btn-update">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>

    <div class="mt-5">
      <!-- Image preview -->
      <img
        class="col-sm-9"
        v-if="imagePreview"
        :src="imagePreview"
        alt="Image Preview"
        style="max-width: 500px; max-height: 500px"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const name = ref("");
const description = ref("");
const category = ref("");
const price = ref(0);
const quantity = ref(0);
const imagePreview = ref(null);
const imageData = ref(null);
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageData.value = file.name;
    showImagePreview(file);
  }
};

const showImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const VariantID = router.currentRoute.value.params.id;

const submitForm = async () => {
  try {
    const formData = {
      Name: name.value,
      Description: description.value,
      Category: category.value,
      Price: price.value,
      Quantity: quantity.value,
      ImageURL: imageData.value,
    };
    const response = await window.axios.put(
      `http://localhost:3000/api/products/updateProduct/${VariantID}`,
      formData
    );

    if (response.success) {
      console.log("Product updated successfully:", response.updateData);
    } else {
      console.log("Product update failed:", response.message);
    }
  } catch (error) {
    console.error("An error occurred while updating product:", error);
  }
};
</script>
