<style scoped>
.border {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.process {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkcart {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  background-color: rgb(255, 255, 255);
}

.checkout {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  background-color: rgb(255, 255, 255);
}

.checkout-done {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  background-color: rgb(255, 255, 255);
}
.cart-shopping-process {
  border: 1px rgb(150, 151, 148) solid;
  background-color: aliceblue;
}
.router-link.router-link-active .checkcart {
  background-color: #87cefa;
}

.router-link.router-link-active .checkout {
  background-color: #87cefa;
}

.router-link.router-link-active .checkout-done {
  background-color: #87cefa;
}
</style>

<template>
  <div class="container" style="max-width: 70%">
    <div class="border border-bottom mt-5 z-1"></div>
    <div class="process">
      <div>
        <router-link :to="{ name: 'Cart-list' }" class="router-link">
          <font-awesome-icon
            class="checkcart z-2 rounded-5 cart-shopping-process"
            icon="fa-solid fa-bag-shopping"
            size="xl"
          />
        </router-link>
      </div>

      <div>
        <router-link :to="{ name: 'Cart-checkout' }" class="router-link">
          <font-awesome-icon
            class="checkout z-2 rounded-5 cart-shopping-process"
            icon="fas fa-money-check-dollar"
            size="xl"
          />
        </router-link>
      </div>

      <div>
        <router-link to="carts/checkout-done" class="router-link">
          <font-awesome-icon
            class="checkout-done z-2 rounded-5 cart-shopping-process"
            icon="fa-solid fa-circle-check"
            size="xl"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
