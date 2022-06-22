import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { randomCompanies } from "./defaultData";

export const useContactsStore = defineStore("contacts", () => {
  const contacts = ref([]);

  const selectedContact = ref({});

  const isLoading = ref(true);
  const errors = ref([]);
  /**
   * This function sets the selected contact that is currently being viewed or edited.
   * @param  id the ID of the contact to select
   */
  const setSelectedContact = (id) => {
    selectedContact.value = {
      ...contacts.value.find((contact) => contact.id == id),
    };
  };

  /**
   *
   * @param  id The ID of the contact to retreive
   * @returns The contact with the given ID
   */
  const getContactById = (id) =>
    contacts.value.find((contact) => contact.id == id);

  /**
   * This function loads the saved contacts from local storage, or if there are none,
   * it loads default contacts from a random user generator API.
   */
  const getContacts = async () => {
    isLoading.value = true;
    errors.value = [];
    if (localStorage.getItem("contacts")) {
      contacts.value = JSON.parse(localStorage.getItem("contacts"));
      isLoading.value = false;
      errors.value = [];
    } else {
      try {
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
        contacts.value = randomContacts.sort(
          (a, b) => a.firstName > b.firstName
        );
        isLoading.value = false;
        errors.value = [];
      } catch (err) {
        errors.value = [
          "There was an error loading your data. Please try again.",
        ];
        console.log(err);
      }
    }
  };

  /**
   * This function toggles the starred status of a contact.
   * @param  id The ID of the contact whose star status is to be toggled.
   */
  const toggleStarred = async (id) => {
    contacts.value = contacts.value.map((contact) =>
      contact.id === id ? { ...contact, starred: !contact.starred } : contact
    );
  };

  /**
   * This function deletes a contact from the store.
   * @param id The ID of the contact to delete.
   */
  const deleteContact = (id) => {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  };

  /**
   * This function adds a new contact to the store.
   * @param contact The contact to add.
   */
  const createContact = async (contact) => {
    isLoading.value = true;
    errors.value = [];
    try {
      const response = await fetch(`https://randomuser.me/api/?results=1`);
      const data = await response.json();
      contacts.value.push({
        ...contact,
        id: contact.id || Math.floor(Math.random() * 100000000000),
        thumbnail: data.results[0].picture.thumbnail,
        image: data.results[0].picture.large,
      });
      contacts.value.sort((a, b) => a.firstName > b.firstName);
      isLoading.value = false;
      errors.value = [];
    } catch (err) {
      console.log(err);
      isLoading.value = false;
      errors.value = [
        "There was an error creating your contact. Please try again.",
      ];
    }
  };

  /**
   *
   * @param id The ID of the contact to update.
   * @param editedContact The edited contact to update.
   */
  const editContact = (id, editedContact) => {
    contacts.value = contacts.value.map((contact) =>
      contact.id == id ? { ...contact, ...editedContact } : contact
    );
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
    contacts: { allContacts: contacts, errors, selectedContact, isLoading },
    createContact,
    deleteContact,
    editContact,
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
