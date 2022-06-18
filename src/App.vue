<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="main-header">
    <div class="logo">
      <router-link to="/"> The Contacts App </router-link>
    </div>
    <nav class="main-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";
.main-header {
  max-width: 1600px;
  width: 95vw;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  text-decoration: none;
}

nav.main-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  grid-gap: 1rem;
  text-decoration: none;
}
</style>
