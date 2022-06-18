<script setup>
const props = defineProps({
  contact: {
    type: Object,
    required: true,
    validator: (prop) => typeof prop.firstName === "string",
  },
});
</script>

<template>
  <div>{{ props.contact.firstName }}</div>
</template>
