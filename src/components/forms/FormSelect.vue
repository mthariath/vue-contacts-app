<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <slot />
  </select>
</template>

<style scoped>
select {
  padding: 0.45rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #333;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
}
</style>
