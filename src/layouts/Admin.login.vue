<template>
  <div class="container mt-5">
    <form class="contend" @submit.prevent="onSubmit">
      <div class="mt-5 text-center">
        <img src="../assets/shine-logo.svg" width="400" alt="" />
        <div>
          <b>ADMINISTRATOR</b>
        </div>
      </div>
      <div class="form-group">
        <input
          v-model="formData.username"
          class="form-control"
          placeholder="Email address or phone number"
          autocomplete="current-username"
          @input="checkUsernameNull"
        />
      </div>

      <div v-if="formData.showErrorUsername_Null" class="text-danger">
        <i><small>Please enter email or phone number</small></i>
      </div>

      <div class="form-group">
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          @input="checkPasswdNull"
        />
      </div>
      <div v-if="formData.showErrorPasswd_Null" class="text-danger">
        <i><small>Please enter password</small></i>
      </div>

      <div class="form-group">
        <a href="#"> Forgotten password? </a>
      </div>

      <div class="form-group text-center mt-5">
        <button type="submit" class="btn btn-log">Log in</button>
      </div>
    </form>

    <!-- show error -->
    <div v-if="formData.showError" class="notification">
      <div class="alert alert-danger">
        <p style="font-size: 12px">
          <font-awesome-icon icon="bell" style="color: #d82222" /> The email
          address or mobile number you entered isn't connected to an account!
        </p>
        <button type="button" class="btn btn-primary" @click="closeError">
          OK
        </button>
      </div>
    </div>
  </div>
  <footer class="mt-5 text-center">
    <p>Tư vấn bán hàng miễn phí: <a href="">0962092609</a></p>
    <p>&copy;</p>
  </footer>
</template>

<script setup>
import { useAuthAdmin } from "@/stores/auth-admin"; // Import store

import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const formData = ref({
  username: "",
  password: "",
  showError: false,
});

const closeError = () => {
  formData.value.showError = false;
};

const checkUsernameNull = () => {
  if (formData.value.username == "") {
    return (formData.value.showErrorUsername_Null = true);
  } else {
    return (formData.value.showErrorUsername_Null = false);
  }
};

const checkPasswdNull = () => {
  if (formData.value.password == "") {
    return (formData.value.showErrorPasswd_Null = true);
  } else {
    return (formData.value.showErrorPasswd_Null = false);
  }
};

const authStore = useAuthAdmin(); // Sử dụng store

const onSubmit = async () => {
  try {
    const response = await window.axios.post(
      "http://localhost:3000/api/users/admin/login",
      formData.value
    );

    if (response.status === 200) {
      const isAdmin = response.data && response.data.checklogin.RoleID === "Ad";
      if (isAdmin) {
        authStore.login(response.data.checklogin.Username);
        router.push("/admin");
        console.log("Login success");
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Login failed");
      formData.value.showError = true;
    } else {
      console.error("An error occurred while logging in:", error);
    }
  }
};
</script>
<style scoped>
@import url("@/assets/pages/Ad.login.css");
</style>
