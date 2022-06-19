<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="main-header">
    <div class="logo">
      <router-link to="/">
        <img src="/logo.svg" alt="The Contacts App Logo" />
        <span class="mobile-hide">The Contacts App</span></router-link
      >
    </div>
    <nav class="main-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contacts">Contacts</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

.main-header {
  max-width: 1600px;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  /* height: 70px; */
  background-color: var(--color-background);
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  text-decoration: none;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  grid-gap: 1rem;
}

.logo img {
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
}

.logo .icon {
  font-size: 3rem;
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
.main-nav a {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 1.6rem;
}

.main-nav .router-link-active {
  font-weight: 700;
}
.main-nav a:hover {
  color: var(--color-text-primary);
}
</style>
