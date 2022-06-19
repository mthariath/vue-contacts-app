<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
const route = useRoute();
store.getContacts();
store.setSelectedContact(route.params.id);
watch(route, (state) => {
  store.setSelectedContact(state.params.id);
});

const toggleStarred = () => {
  console.log(store.contacts.selectedContact.starred);
  store.toggleStarred(store.contacts.selectedContact.id);
};
</script>

<template>
  <div class="contact-body">
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
      </div>
      <div class="actions">
        <button>Edit</button>
        <button class="delete">Delete</button>
      </div>
      <div class="phone-numbers">
        <div class="title">Phone Numbers</div>
        <ul>
          <li
            v-for="(number, index) in store.contacts.selectedContact
              .phoneNumbers"
            v-bind:key="index"
          >
            <span class="type">{{ number.type }}</span>
            <span class="number">{{ number.number }}</span>
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
}
.contact-body {
  display: flex;
  margin-bottom: auto;
  flex: 1;
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

.actions button {
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.3);
  flex: 1;
}

button.delete {
  color: rgba(255, 30, 24, 0.6);
}
</style>

<style>
.contacts-list.selected {
  display: none;
}

@media (min-width: 768px) {
  .contacts-list.selected {
    display: block;
    flex: 1;
  }
}
</style>
