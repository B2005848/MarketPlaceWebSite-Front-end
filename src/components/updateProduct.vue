<template>
  <div class="edit-user-form">
    <h2>Edit User Profile</h2>
    <form @submit.prevent="updateUser">
      <label for="firstName">First Name:</label>
      <input
        v-model="userDetails.firstName"
        type="text"
        id="firstName"
        required
      />

      <label for="lastName">Last Name:</label>
      <input
        v-model="userDetails.lastName"
        type="text"
        id="lastName"
        required
      />

      <label for="email">Email:</label>
      <input v-model="userDetails.email" type="email" id="email" required />

      <label for="contactAddress">Contact Address:</label>
      <input
        v-model="userDetails.contactAddress"
        type="text"
        id="contactAddress"
      />

      <label for="birthday">Birthday:</label>
      <input
        v-model="userDetails.birthday"
        type="date"
        id="birthday"
        required
      />

      <label for="profilePicture">Profile Picture:</label>
      <input type="file" id="profilePicture" @change="handleFileUpload" />

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  contactAddress: "",
  birthday: "",
  profilePicture: null, // Store the selected file
});

const updateUser = async () => {
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
.edit-user-form {
  max-width: 400px;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  margin-bottom: 16px;
  padding: 8px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
