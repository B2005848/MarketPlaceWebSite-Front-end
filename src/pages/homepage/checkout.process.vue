<template>
  <div class="checkout-form container-fuild m-3">
    <form class="border-end" style="max-width: 50%">
      <div class="row m-3">
        <!-- FIRSTNAME -->
        <div class="col-sm-6">
          <label for="first-name" class="form-label"
            >First Name <span class="text-danger">*</span></label
          >
          <input
            v-model="userInfo.FirstName"
            type="text"
            id="first-name"
            class="form-control"
          />
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>

        <!-- LASTNAME -->
        <div class="col-sm-6">
          <label for="last-name" class="form-label"
            >Last Name <span class="text-danger">*</span></label
          >
          <input
            v-model="userInfo.LastName"
            type="text"
            id="last-name"
            class="form-control"
          />
          <div class="invalid-feedback">Valid last name is required.</div>
        </div>

        <!-- NUMBERPHONE -->
        <div class="mt-2">
          <label for="phone" class="form-label"
            >Number phone <span class="text-danger">*</span></label
          >
          <input
            type="tel"
            id="phone"
            class="form-control"
            required
            pattern="[0-9]{10}"
          />
          <div class="invalid-feedback">Your phone number is required.</div>
        </div>

        <!-- EMAIL -->
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

        <!-- ADDRESS -->
        <div class="mt-2">
          <label for="address" class="form-label"
            >Address <span class="text-danger">*</span></label
          >
          <input
            v-model="userInfo.ContactAddress"
            type="text"
            id="address"
            class="form-control"
          />
          <div class="invalid-feedback">
            Please enter your shipping address..
          </div>
        </div>

        <div class="mt-4">
          <div class="form-check">
            <input
              class="form-check-input"
              name="paymentMethod"
              type="radio"
              value="COD"
              id="cod"
            />
            <label class="form-check-label" for="cod">
              Cash on Delivery (COD)
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              name="paymentMethod"
              type="radio"
              value="BANKING"
              id="banking"
            />
            <label class="form-check-label" for="banking"> Banking </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthUser } from "@/stores/auth-userlogin.js";
import { onMounted, ref } from "vue";
const useStore = useAuthUser();

const username = useStore.userName;
const userInfo = ref({
  FirstName: "",
  LastName: "",
  ContactAddress: "",
  Email: "",
});
const getInfoUser = async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/users/getuserbyusername/${username}`
    );
    console.log(response);

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
