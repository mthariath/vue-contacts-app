<script setup>
import ButtonLink from "@/components/forms/ButtonLink.vue";
import ContactCard from "@/components/ContactCard.vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
store.getContacts();
</script>

<template>
  <main class="main-container">
    <section>
      <div :class="['contacts-list', $route.params.id ? 'selected' : '']">
        <header>
          <h2>All Contacts</h2>
          <ButtonLink to="/contacts/new" class="primary">
            Create a Contact
          </ButtonLink>
        </header>
        <div class="list" v-if="store.contacts.allContacts">
          <p v-if="store.contacts.allContacts.length === 0">
            You have no contacts. Add one to get started!
          </p>
          <template
            v-for="contact of store.contacts.allContacts"
            v-bind:key="contact.id"
          >
            <ContactCard isLink :contact="contact" />
          </template>
        </div>
      </div>
      <div class="body" v-if="!$route.params.id">
        <p>Select a contact to view their details.</p>
      </div>
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: auto;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
header a {
  margin-left: auto;
}
.body {
  flex: 1;
  display: none;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
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

.contacts-list {
  background-color: white;
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
.contacts-list h2 {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 0;
  text-transform: uppercase;
}

.contacts-list .list {
  max-height: 85vh;
  overflow-y: auto;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .body {
    display: flex;
  }
}
</style>
