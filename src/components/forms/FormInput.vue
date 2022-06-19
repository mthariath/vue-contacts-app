<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style>
input {
  padding: 0.45rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #333;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
}
input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.7);
  border-color: var(--color-primary);
}

input[type="file"] {
  border: none;
  background: none;
}
</style>
