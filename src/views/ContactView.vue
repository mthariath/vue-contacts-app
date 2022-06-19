<script setup>
import { watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import router from "@/router";
import { useContactsStore } from "@/stores/contacts";
import ButtonLink from "@/components/forms/ButtonLink.vue";

const store = useContactsStore();
const route = useRoute();
store.getContacts();
store.setSelectedContact(route.params.id);
watch(
  () => route.params.id,
  (newId) => {
    store.setSelectedContact(newId);
  }
);

const toggleStarred = () => {
  console.log(store.contacts.selectedContact.starred);
  store.toggleStarred(store.contacts.selectedContact.id);
};

const deleteContact = () => {
  if (window.confirm("Are you sure you want to delete this contact?")) {
    store.deleteContact(store.contacts.selectedContact.id);
    router.push("/contacts");
  }
};
</script>

<template>
  <div class="contact-body">
    <ButtonLink to="/contacts" class="back-button primary">
      Back to Contacts
    </ButtonLink>
    <template v-if="!store.contacts.selectedContact">
      Sorry, I couldnt find that contact. Please select one from the list to the
      left.
    </template>

    <article v-if="store.contacts.selectedContact">
      <div class="image">
        <img
          :src="store.selectedContact.image"
          :alt="`${store.selectedContact.firstName} ${store.selectedContact.lastName} Thumbnail`"
        />
      </div>
      <div class="personal-info">
        <div class="name">
          <button
            v-if="store.contacts.selectedContact.starred"
            @click="toggleStarred"
            class="star starred"
          >
            ⭐
          </button>
          <button
            v-if="!store.contacts.selectedContact.starred"
            @click="toggleStarred"
            class="star"
          >
            ☆
          </button>
          <template v-if="store.contacts.selectedContact.salutation"
            >{{ store.contacts.selectedContact.salutation }}.
          </template>
          {{ store.contacts.selectedContact.firstName }}
          {{ store.contacts.selectedContact.lastName }}
        </div>
        <div class="company-name">
          {{ store.contacts.selectedContact.companyName }}
        </div>
      </div>
      <div class="actions">
        <RouterLink :to="`/contacts/${store.contacts.selectedContact.id}/edit`"
          >Edit</RouterLink
        >
        <button class="delete" @click="deleteContact">Delete</button>
      </div>
      <div class="phone-numbers">
        <div class="title">Phone Numbers</div>
        <ul>
          <li
            v-for="(number, index) in store.contacts.selectedContact
              .phoneNumbers"
            v-bind:key="index"
          >
            <span class="icon" v-if="number.type === 'mobile'">📱 </span>
            <span class="icon" v-if="number.type === 'home'">🏠 </span>
            <span class="icon" v-if="number.type === 'work'">🏢 </span>
            <div class="text">
              <span :class="['number', number.type]">{{ number.number }}</span>
              <span class="type" v-if="number.type === 'mobile'">Mobile</span>
              <span class="type" v-if="number.type === 'home'">Home</span>
              <span class="type" v-if="number.type === 'work'">Work</span>
            </div>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 1.2rem;
}
.contact-body {
  display: flex;
  margin-bottom: auto;
  flex: 1;
  flex-direction: column;
}
.back-button {
  margin-right: auto;
  display: block;
}
.image {
  height: 8rem;
  width: 8rem;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}

.name {
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}

.company-name {
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
button.star {
  height: 4.2rem;
  background: none;
  font-size: 3.5rem;
  border: none;
}

button.starred {
  height: 4.2rem;
  font-size: 2.6rem;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}

.actions button,
.actions a {
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.3);
  flex: 1;
}

button.delete {
  color: rgba(255, 30, 24, 0.6);
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.phone-numbers .title {
  font-size: 1.2rem;
  /* color: rgba(0, 0, 0, 0.5); */
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
}
.phone-numbers ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.phone-numbers li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  grid-gap: 1rem;
}

.phone-numbers li .icon {
  font-size: 2.5rem;
}
.phone-numbers li .text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.phone-numbers li .number {
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* color: rgba(0, 0, 0, 0.8); */
}

.number.mobile {
  color: #00bcd4;
}
.number.home {
  color: #4caf50;
}
.number.work {
  color: #ff9800;
}
.phone-numbers li .type {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
}
@media (min-width: 768px) {
  .back-button {
    display: none;
  }
}
</style>
