<template>
  <button><slot /></button>
</template>

<style scoped>
button {
  padding: 0.45rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #333;
  text-transform: uppercase;
  font-weight: 500;
}
button.primary {
  background-color: var(--color-primary);
  color: white;
}
</style>
