<script setup>
import ContactCard from "@/components/ContactCard.vue";
import { storeToRefs } from "pinia";
import { useContactsStore } from "@/stores/contacts";
import { useCounterStore } from "@/stores/counter";

const store = useContactsStore();
</script>

<template>
  <main class="main-container">
    <section>
      <div class="hero-text">
        <h1>Welcome!</h1>
        <p>You have {{ store.contacts.length }} contacts.</p>
      </div>
      <div class="starred-contacts">
        <h2>Starred Contacts</h2>
        <div class="list" v-if="store.contacts">
          <template v-for="contact of store.contacts" v-bind:key="contact.id">
            <ContactCard v-if="contact.starred" :contact="contact" />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.hero-text {
  flex: 1;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0;
}

p {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.starred-contacts {
  background-color: white;
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
.starred-contacts h2 {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 0;
  text-transform: uppercase;
}

.starred-contacts .list {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
