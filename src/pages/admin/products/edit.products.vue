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
      <h1 class="text-center">Edit Variant Product</h1>
      <form
        @submit.prevent="submitForm"
        method="post"
        enctype="multipart/form-data"
      >
        <!-- Material -->
        <div>
          <label class="col-sm-2" for="material">Material</label>
          <input v-model="material" type="text" id="material" />
        </div>

        <!-- quantity -->
        <div>
          <label class="col-sm-2" for="quantity">Quantity</label>
          <input v-model="quantity" type="number" id="quantity" />
        </div>

        <!-- Size -->
        <div>
          <label class="col-sm-2" for="size">Size</label>
          <input
            v-model="size"
            type="text"
            id="Size"
            placeholder="d x r x h (mm, cm, ...)"
          />
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

  <!-- show result -->
  <div class="mt-3">
    <p v-if="successMessage" class="text-success">
      "Product variant updated successfully."
    </p>
    <p v-if="errorMessage" class="text-danger">Product update failed</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const description = ref("");
const material = ref("");
const size = ref("");
const price = ref(0);
const quantity = ref(0);
const imagePreview = ref(null);
const imageData = ref(null);
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    showImagePreview(file);
  }
};

const showImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageData.value = e.target.result;

    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const VariantID = router.currentRoute.value.params.id;

const successMessage = ref(false);
const errorMessage = ref(false);

const getData = async () => {
  try {
    const Data = await window.axios.get(
      `http://localhost:3000/api/products/ProductVariant/${VariantID}`
    );
    if (Data.status === 200) {
      console.log(Data);
    }
  } catch (error) {
    console.error("An error occurred while get product:", error);
  }
};

const submitForm = async () => {
  try {
    const formData = {
      Description: description.value,
      Size: size.value,
      Material: material.value,
      Price: price.value,
      Quantity: quantity.value,
      ImageURL: imageData.value,
    };

    const response = await window.axios.put(
      `http://localhost:3000/api/products/updateVarProduct/${VariantID}`,
      formData
    );

    if (response.status == 201) {
      successMessage.value = true;
      errorMessage.value = false;
      console.log("Product updated successfully:");
    } else {
      successMessage.value = false;
      errorMessage.value = true;
      console.log("Product update failed:", response.message);
    }
  } catch (error) {
    errorMessage.value = "An error occurred while updating product.";
    successMessage.value = "";
    console.error("An error occurred while updating product:", error);
  }
};

onMounted(() => {
  getData();
});
</script>
