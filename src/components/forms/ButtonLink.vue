<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink><slot /></RouterLink>
</template>

<style scoped>
a {
  padding: 0.45rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.25rem;
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  text-transform: uppercase;
  font-weight: 500;
}
a.primary {
  background-color: var(--color-primary);
  color: white;
}
</style>
