import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { defaultContacts } from "./defaultData";

// export const useContactsStore = defineStore("contacts", () => {
//   const contacts = ref(defaultContacts);

//   const getContactrById = computed((id) =>
//     contacts.value.find((contact) => contact.id === id)
//   );

//   return {
//     contacts,
//     getContactrById,
//   };
// });

export const useContactsStore = defineStore({
  id: "contacts",
  state: () => ({
    contacts: [
      {
        id: "1234",
        firstName: "Bob",
        lastName: "Smith",
        image: "/",
        salutation: "Mr.",
        starred: false,
        companyName: "Smith & Sons",
        phoneNumbers: [
          {
            type: "mobile",
            number: "555-555-5555",
          },
        ],
      },
      {
        id: "5678",
        firstName: "Richard",
        lastName: "Jones",
        image: "/",
        salutation: "Mr.",
        starred: true,
        companyName: "Acme Inc",
        phoneNumbers: [
          {
            type: "mobile",
            number: "555-555-5525",
          },
          {
            type: "home",
            number: "535-555-5525",
          },
        ],
      },
    ],
  }),
  getters: {
    getAll: (state) => state.contacts,
  },
  actions: {},
});
