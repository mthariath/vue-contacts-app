<script setup>
import { RouterLink } from "vue-router";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();

const props = defineProps({
  contact: {
    type: Object,
    required: true,
    validator: (prop) => typeof prop.firstName === "string",
  },
  isLink: {
    type: Boolean,
    default: false,
  },
});

const toggleStarred = () => store.toggleStarred(props.contact.id);
</script>

<template>
  <div
    :class="[$route.params.id == props.contact.id ? 'selected' : '', 'wrapper']"
  >
    <button v-if="props.contact.starred" @click="toggleStarred" class="star starred">
      ⭐
    </button>
    <button v-if="!props.contact.starred" @click="toggleStarred" class="star">
      ☆
    </button>
    <component
      :is="isLink ? 'RouterLink' : 'div'"
      class="card"
      :to="isLink ? `/contacts/${props.contact.id}` : null"
    >
      <div class="image">
        <img
          :src="props.contact.thumbnail"
          :alt="`${props.contact.firstName} ${props.contact.lastName} Thumbnail`"
        />
      </div>
      <div class="details">
        <span class="name"
          >{{ props.contact.firstName }} {{ props.contact.lastName }}</span
        >
        <span class="tel">{{
          props.contact.phoneNumbers[props.contact.primaryNumber].number
        }}</span>
      </div>
    </component>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 2rem 1fr;
  background-color: #fff;
}
.wrapper:hover {
  background-color: #f5f5f5;
}

.wrapper.selected {
  background-color: #f6f6f6;
}
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all 0.2s ease-in-out;
}

button.star {
  background: none;
  font-size: 2rem;
  border: none;
}

button.starred {
  font-size: 1.3rem;
}

.wrapper:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
.details {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 1.5rem;
  margin-bottom: 0;
}
.image {
  height: 3rem;
  width: 3rem;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}

.tel {
  font-size: 1.2rem;
  color: #999;
}

.tel,
.name {
  display: block;
}

@media (min-width: 1024px) {
  .wrapper {
    grid-template-columns: 5rem 1fr;
  }
  .card {
    padding: 1rem;
  }
  .details {
    flex-direction: row;
    grid-gap: 0.5rem;
    align-items: center;
  }
}
</style>
