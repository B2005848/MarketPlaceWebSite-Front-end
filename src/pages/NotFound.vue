<template>
  <div class="page">
    <div class="text-center">
      <img src="../img/404.svg" alt="" />
      <p>
        Oops, This page cannot be found. Go to
        <router-link :to="{ path: '/' }"> HomePage. </router-link>
      </p>
    </div>
  </div>
</template>
