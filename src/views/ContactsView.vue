<script setup>
import BasicBox from "@/components/BasicBox.vue";
import ButtonLink from "@/components/forms/ButtonLink.vue";
import ContactCard from "@/components/ContactCard.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
store.getContacts();
</script>

<template>
  <main class="main-container">
    <section>
      <BasicBox
        :class="['contacts-list', $route.matched.length > 1 ? 'nested' : '']"
      >
        <header>
          <h2>All Contacts</h2>
          <ButtonLink to="/contacts/new" class="primary">
            Create a Contact
          </ButtonLink>
        </header>
        <div class="list" v-if="store.contacts.allContacts">
          <p
            v-if="
              store.contacts.allContacts.length === 0 &&
              !store.contacts.isLoading
            "
          >
            You have no contacts. Add one to get started!
          </p>

          <p v-if="store.contacts.isLoading">
            Just a sec, loading up your contacts...
          </p>
          <ErrorDisplay
            :errors="store.contacts.errors"
            v-if="store.contacts.errors.length"
          />
          <template
            v-for="contact of store.contacts.allContacts"
            v-bind:key="contact.id"
          >
            <ContactCard isLink :contact="contact" />
          </template>
        </div>
      </BasicBox>
      <div class="body" v-if="$route.matched.length === 1">
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
  flex: 1;
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
  flex: 1;
  align-self: center;
}

.contacts-list.nested {
  display: none;
}

@media (min-width: 768px) {
  .contacts-list.nested {
    display: block;
    flex: 1;
  }
}
.contacts-list h2 {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 0;
  text-transform: uppercase;
}

.contacts-list .list {
  max-height: 70vh;
  overflow-y: auto;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .body {
    display: flex;
  }
}
</style>
