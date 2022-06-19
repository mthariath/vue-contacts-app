<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  title: String,
  description: String,
});

const formChanged = ref(false);
const handleFormChange = () => {
  formChanged.value = true;
  console.log("inside form");
};

onBeforeRouteLeave(() => {
  if (formChanged.value) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (!answer) return false;
  }
  return true;
});

const onSubmit = () => formChanged.value = false
</script>

<template>
  <form @change="handleFormChange" @submit.prevent="onSubmit">
    <h1>{{ props.title }}</h1>
    <p>{{ props.description }}</p>
    <slot />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 0.6rem;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

form > h1 {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
}

form > p {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
