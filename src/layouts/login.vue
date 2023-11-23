<template>
  <div class="layout-background">
    <div class="container lg-grid">
      <div>
        <router-link to="/">
          <img src="@/assets/shine-logo.svg" width="500" alt="" />
        </router-link>
      </div>
      <div class="logohome"></div>
      <div>
        <router-view class="fade-in"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/assets/layouts/login.css");
</style>
