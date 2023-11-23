<template>
  <div class="null-cart text-center mt-5">
    <div>
      <img :src="getImageUrl('cart-empty.gif')" alt="" />
    </div>
    <div>
      <p>Your shopping cart is empty</p>
    </div>

    <div>
      <router-link to="/">
        <span>Go Shopping Now</span>
      </router-link>
    </div>
  </div>
</template>
<script setup>
const getImageUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
</script>
