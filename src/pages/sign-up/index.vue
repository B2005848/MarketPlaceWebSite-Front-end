<template>
  <div class="sgup-container">
    <form @submit.prevent="signup" class="row g-3">
      <h1>Sign Up</h1>
      <p><small>It's quick and easy.</small></p>

      <!-- input EMAIL -->
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label"
          >Email or phone number</label
        >
        <input
          v-model="formData.username"
          type="text"
          class="form-control"
          id="inputEmail4"
          @input="checkUsernameExist"
          autocomplete="username"
        />
        <div v-if="formData.showErrorUsername_Null" class="text-danger">
          <i><small>Not null!</small></i>
        </div>
        <div v-if="formData.showErrorUsername" class="text-danger">
          <i
            ><small
              >Account or email already exists, please enter another
              account!</small
            ></i
          >
        </div>
      </div>

      <!-- input PASSWD -->
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          id="inputPassword4"
          autocomplete="new-password"
        />
        <div v-if="ShowErrorNullPass" class="text-danger">
          <i><small>Please enter a password</small></i>
        </div>
      </div>

      <div class="col-12">
        <label for="inputPassword5" class="form-label"
          >Re-Enter the password</label
        >
        <input
          v-model="formData.confirmPassword"
          type="password"
          class="form-control"
          id="inputPassword5"
          autocomplete="new-password"
        />
        <div v-if="showErrorPasswordsDoNotMatch" class="text-danger">
          <i><small>Passwords do not match.</small></i>
        </div>
      </div>

      <!-- input FIRST-NAME -->
      <div class="col-md-6">
        <label for="first-name" class="form-label">First Name</label>
        <input
          v-model="formData.first_name"
          type="text"
          class="form-control"
          id="first-name"
        />
      </div>

      <!-- input LAST-NAME -->
      <div class="col-md-6">
        <label for="last-name" class="form-label">Last Name</label>
        <input
          v-model="formData.last_name"
          type="text"
          class="form-control"
          id="last-name"
        />
      </div>

      <!-- input ADDRESS -->
      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input
          v-model="formData.address"
          type="text"
          class="form-control"
          id="inputAddress"
          placeholder="House number, street name, District, Province..."
        />
      </div>

      <!-- input BIRTHDAY -->
      <label for="inputState" class="form-label">Date of Birh</label>
      <div class="col-md-4">
        <select
          v-model="formData.selectedDay"
          id="inputState"
          name="day"
          class="form-select"
        >
          <option selected>Date</option>
          <option v-for="day in formData.days" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <select
          v-model="formData.selectedMonth"
          name="month"
          class="form-select"
        >
          <option selected>Month</option>
          <option v-for="month in formData.months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <select v-model="formData.selectedYear" name="year" class="form-select">
          <option selected>Year</option>
          <option v-for="year in formData.years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="gridCheck"
            v-model="formData.checkTerm"
          />
          <label class="form-check-label" for="gridCheck"
            >Agree to <router-link to="#">the terms?</router-link></label
          >
          <div v-if="showErrorAgreeTerm" class="text-danger">
            <i
              ><small>
                Please agree to the terms of use before registering</small
              ></i
            >
          </div>
        </div>
      </div>

      <div class="col-12">
        <button type="submit" class="button-sig btn btn-primaryclass=">
          Sign up
        </button>

        <p>
          Have an account?
          <router-link to="/accounts/login">Go to Sign in</router-link>
        </p>
      </div>
    </form>

    <div v-if="formData.showNoteSucess" class="notification">
      <div class="alert alert-success">
        <p>
          <font-awesome-icon icon="bell" style="color: #ccd822" /> You have
          successfully created an account!
        </p>
        <router-link style="text-decoration: none" to="/accounts/login"
          ><p>Go to Sign in</p></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const formData = ref({
  days: [],
  months: [],
  years: [],
  username: "",
  password: "",
  confirmPassword: "",
  first_name: "",
  last_name: "",
  address: "",
  selectedDay: null,
  selectedMonth: null,
  selectedYear: null,
  showNoteSucess: false,
});

// Define list dd/mm/yyyy
for (let day = 1; day <= 31; day++) {
  formData.value.days.push(day);
}

for (let month = 1; month <= 12; month++) {
  formData.value.months.push(month);
}

for (let year = 1970; year <= 2099; year++) {
  formData.value.years.push(year);
}

// define show error
const showErrorPasswordsDoNotMatch = computed(() => {
  return formData.value.password !== formData.value.confirmPassword;
});

const ShowErrorNullPass = computed(() => {
  return !formData.value.password;
});

const showErrorAgreeTerm = computed(() => {
  return !formData.value.checkTerm;
});

// check account have been exist in database?
const checkUsernameExist = async () => {
  formData.value.showErrorUsername = false;
  formData.value.showErrorUsername_Null = false;

  if (formData.value.username) {
    try {
      const response = await window.axios.get(
        `http://localhost:3000/api/users/getuserbyusername/${formData.value.username}`
      );
      if (response.status === 404) {
        return;
      }
      if (response.status === 200) {
        formData.value.showErrorUsername = true;
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  } else if (formData.value.username == "") {
    formData.value.showErrorUsername_Null = true;
  }
};
checkUsernameExist();

const signup = async () => {
  const userData = {
    username: formData.value.username,
    password: formData.value.password,
    firstName: formData.value.first_name,
    lastName: formData.value.last_name,
    contact_address: formData.value.address,
    birthday: `${formData.value.selectedYear}/${formData.value.selectedMonth}/${formData.value.selectedDay}`,
  };

  // Check if the username exists before allowing signup
  if (
    !formData.value.showErrorUsername &&
    !formData.value.showErrorUsername_Null &&
    !formData.value.ShowErrorNullPass &&
    !formData.value.showErrorPasswordsDoNotMatch &&
    formData.value.checkTerm
  ) {
    if (userData.username.includes("@")) {
      userData.email = userData.username;
      try {
        const response = await window.axios.post(
          "http://localhost:3000/api/users/create",
          userData
        );
        if (response.status === 201) {
          console.log("Created success!");
          formData.value.showNoteSucess = true;
          // router.push("/accounts/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await window.axios.post(
          "http://localhost:3000/api/users/create",
          userData
        );
        if (response.status === 201) {
          console.log("Created success!");
          formData.value.showNoteSucess = true;
          // router.push("/accounts/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
@import url("@/assets/pages/login.css");
</style>
