<script setup>
const props = defineProps({
  errors: {
    type: Array,
    required: true,
    validator: (prop) => typeof prop === "string",
  },
});
</script>

<template>
  <ul>
    <li v-for="(err, i) in props.errors" v-bind:key="i">{{ err }}</li>
  </ul>
</template>

<style scoped>
li {
  color: rgba(255, 30, 24, 0.6);
}
</style>
