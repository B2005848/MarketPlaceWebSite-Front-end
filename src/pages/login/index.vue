<template>
  <div class="lg-container">
    <form @submit.prevent="onSubmit">
      <h1>Log In</h1>
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

      <div class="form-group">
        <button type="submit" class="btn-log btn btn-primary">Log in</button>
      </div>

      <div class="form-group">
        <p>
          Don't have an account?
          <router-link to="/accounts/sign-up">
            <a href="#">Register here for free!</a></router-link
          >
        </p>
      </div>
    </form>

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
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthUser } from "@/stores/auth-userlogin";

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

const authStore = useAuthUser(); // Sử dụng store

const onSubmit = async () => {
  try {
    const response = await window.axios.post(
      "http://localhost:3000/api/users/login",
      formData.value
    );

    if (response.status === 200) {
      const isUser = response.data && response.data.checklogin.RoleID !== "Ad";
      if (isUser) {
        authStore.login(response.data.checklogin.LastName);
        router.push("/");
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
@import url("@/assets/pages/login.css");
</style>
