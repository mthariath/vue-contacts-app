import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { randomCompanies } from "./defaultData";

export const useContactsStore = defineStore("contacts", () => {
  const contacts = ref([]);

  const selectedContact = ref({});

  const setSelectedContact = (id) =>
    (selectedContact.value = contacts.value.find(
      (contact) => contact.id == id
    ));

  const getContactById = (id) =>
    contacts.value.find((contact) => contact.id == id);

  const getContacts = async () => {
    if (localStorage.getItem("contacts")) {
      console.log(JSON.parse(localStorage.getItem("contacts")));
      contacts.value = JSON.parse(localStorage.getItem("contacts"));
    } else {
      const response = await fetch(
        `https://randomuser.me/api/?results=${Math.round(
          (Math.random() * 100) / 2.5 + 5
        )}`
      );
      const data = await response.json();
      const randomContacts = data.results.map((r) => ({
        id: Math.floor(Math.random() * 100000000000),
        firstName: r.name.first,
        lastName: r.name.last,
        salutation: r.name.title,
        thumbnail: r.picture.thumbnail,
        image: r.picture.large,
        starred: Math.random() > 0.3,
        companyName:
          Math.random() > 0.4
            ? null
            : randomCompanies[
                Math.floor(Math.random() * randomCompanies.length)
              ],
        primaryNumber: Math.random() < 0.3 ? 1 : 0,
        phoneNumbers: [
          {
            type: "mobile",
            number: r.cell,
          },
          {
            type: Math.random() < 0.3 ? "home" : "work",
            number: r.phone,
          },
        ],
      }));
      console.log(data);
      console.log(randomContacts);
      contacts.value = randomContacts.sort((a, b) => a.firstName > b.firstName);
    }
  };

  const toggleStarred = async (id) => {
    contacts.value = contacts.value.map((contact) =>
      contact.id === id ? { ...contact, starred: !contact.starred } : contact
    );
  };

  const deleteContact = (id) => {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  };

  const createContact = async (contact) => {
    console.log("contacts.value", contacts.value);
    const response = await fetch(`https://randomuser.me/api/?results=1`);
    const data = await response.json();
    contacts.value.push({
      ...contact,
      id: contact.id || Math.floor(Math.random() * 100000000000),
      thumbnail: data.results[0].picture.thumbnail,
      image: data.results[0].picture.large,
    });
    contacts.value.sort((a, b) => a.firstName > b.firstName);
  };

  watch(
    contacts,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem("contacts", JSON.stringify(state));

      // update the selected contact, if it's changed
      if (selectedContact.value) setSelectedContact(selectedContact.value.id);
    },
    { deep: true }
  );

  return {
    contacts: { allContacts: contacts, selectedContact },
    createContact,
    deleteContact,
    getContactById,
    getContacts,
    selectedContact,
    setSelectedContact,
    toggleStarred,
  };
});

// export const useContactsStore = defineStore({
//   id: "contacts",
//   state: () => ({
//     contacts: defaultContacts,
//   }),
//   getters: {
//     getAll: (state) => state.contacts,
//   },
//   actions: {},
// });
