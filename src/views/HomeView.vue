<script setup>
import ContactCard from "@/components/ContactCard.vue";
import ButtonLink from "@/components/forms/ButtonLink.vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
store.getContacts();
</script>

<template>
  <main class="main-container">
    <section>
      <div class="hero-text">
        <h1>Welcome!</h1>
        <p>You have {{ store.contacts.allContacts.length }} contacts.</p>
        <ButtonLink to="/contacts" class="primary">
          Manage Your Little Black Book &nbsp; 👉
        </ButtonLink>
        <img src="/illustration.svg" alt="Illustration" class="illustration" />
      </div>
      <div class="starred-contacts">
        <h2>Starred Contacts</h2>
        <p v-if="store.contacts.allContacts.length === 0">
          You don't have any starred contacts. Star your favorite contacts to
          access them here easily.
        </p>

        <div class="list" v-if="store.contacts.allContacts">
          <template
            v-for="contact of store.contacts.allContacts"
            v-bind:key="contact.id"
          >
            <ContactCard isLink v-if="contact.starred" :contact="contact" />
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

@media (max-width: 768px) {
  section {
    flex-direction: column;
  }
}
.hero-text {
  flex: 1;
}

.hero-text a {
  align-self: flex-start;
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

.illustration {
  width: 100%;
  max-width: 650px;
  margin-bottom: 1rem;
  margin-top: 3rem;
}

.starred-contacts {
  background-color: white;
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.starred-contacts > p {
  margin: auto;
  text-align: center;
}
.starred-contacts h2 {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 0;
  text-transform: uppercase;
}

.starred-contacts .list {
  max-height: 60vh;
  overflow-y: auto;
  margin-top: 1rem;
}
</style>
