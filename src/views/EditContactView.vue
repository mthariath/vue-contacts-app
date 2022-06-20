<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import router from "@/router";
import BrandedButton from "@/components/forms/BrandedButton.vue";
import ButtonLink from "@/components/forms/ButtonLink.vue";
import FormComponent from "@/components/forms/FormComponent.vue";
import FormInput from "@/components/forms/FormInput.vue";
import FormLabel from "@/components/forms/FormLabel.vue";
import FormSelect from "@/components/forms/FormSelect.vue";
import { useContactsStore } from "@/stores/contacts";

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

const handleSubmit = async (e) => {
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const phoneNumbers = formData.getAll("phone-number");
  const phoneNumbersTypes = formData.getAll("phone-number-type");

  const editedContact = {
    ...store.contacts.selectedContact,
    primaryNumber: parseInt(data["primary-number"], 10) || 0,
    phoneNumbers: phoneNumbers.map((n, i) => ({
      number: n,
      type: phoneNumbersTypes[i],
    })),
  };
  store.editContact(route.params.id, editedContact);

  router.push(`/contacts/${editedContact.id}`);
};

let numPhoneNumbers = ref(store.contacts.selectedContact.phoneNumbers.length);

const addPhoneNumber = () => {
  store.contacts.selectedContact.phoneNumbers = [
    ...store.contacts.selectedContact.phoneNumbers,
    { number: null, type: "mobile" },
  ];
  numPhoneNumbers.value++;
  formChanged.value = true;
};
const removePhoneNumber = () => {
  if (numPhoneNumbers.value > 1) {
    store.contacts.selectedContact.phoneNumbers =
      store.contacts.selectedContact.phoneNumbers.slice(
        0,
        store.contacts.selectedContact.phoneNumbers.length - 1
      );
    numPhoneNumbers.value--;
    formChanged.value = true;
  }
};

const formChanged = ref(false);
const handleFormChange = () => {
  formChanged.value = true;
};
</script>

<template>
  <div class="wrapper">
    <ButtonLink
      :to="`/contacts/${route.params.id}`"
      class="back-button primary"
    >
      Go Back
    </ButtonLink>
    <FormComponent
      @submit="handleSubmit"
      @change="handleFormChange"
      title="Edit Contact"
      description="Editing contact details."
    >
      <FormLabel
        >First Name
        <FormInput
          v-model="store.contacts.selectedContact.firstName"
          name="firstName"
          required
      /></FormLabel>
      <FormLabel
        >Last Name
        <FormInput
          v-model="store.contacts.selectedContact.lastName"
          name="lastName"
          required
      /></FormLabel>
      <FormLabel
        >Salutation
        <FormInput
          v-model="store.contacts.selectedContact.salutation"
          name="salutation"
      /></FormLabel>
      <FormLabel
        >Avatar
        <FormInput type="file" name="avatar" accept="image/png, image/jpeg" />
      </FormLabel>
      <FormLabel
        >Company Name
        <FormInput
          name="company-name"
          v-model="store.contacts.selectedContact.companyName"
      /></FormLabel>
      <div class="phone-numbers">
        <div class="phone-number" v-bind:key="n" v-for="n in numPhoneNumbers">
          <FormLabel for="phone-number">Phone Number</FormLabel>
          <div class="inputs">
            <FormInput
              name="phone-number"
              type="tel"
              v-model="
                store.contacts.selectedContact.phoneNumbers[n - 1].number
              "
              required
            />
            <FormSelect
              name="phone-number-type"
              v-model="store.contacts.selectedContact.phoneNumbers[n - 1].type"
            >
              <option value="mobile">Mobile</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
            </FormSelect>
          </div>
        </div>

        <div class="buttons">
          <button @click="addPhoneNumber" type="button">➕</button>
          <button
            @click="removePhoneNumber"
            v-if="numPhoneNumbers > 1"
            type="button"
          >
            ➖
          </button>
        </div>
        <FormLabel v-if="numPhoneNumbers > 1">
          Primary Number
          <FormSelect
            name="primary-number"
            v-model="store.contacts.selectedContact.primaryNumber"
          >
            <option v-for="n in numPhoneNumbers" v-bind:key="n" :value="n - 1">
              {{ n }}
            </option>
          </FormSelect>
        </FormLabel>
      </div>
      <ButtonLink :to="`/contacts/${route.params.id}`">
        {{ formChanged ? "Discard Changes" : "Go Back" }}
      </ButtonLink>
      <BrandedButton v-if="formChanged" class="primary" type="submit"
        >Submit</BrandedButton
      >
    </FormComponent>
  </div>
</template>

<style>
.wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.back-button {
  margin-right: auto;
  display: block;
}

.phone-number .inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.phone-numbers .buttons {
  margin-left: auto;
}

@media (min-width: 768px) {
  .phone-number .inputs {
    display: grid;
    grid-template-columns: 1.618fr 1fr;
  }

  .back-button {
    display: none;
  }
}
</style>
