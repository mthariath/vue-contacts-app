<script setup>
import { ref } from "vue";
import router from "@/router";
import BrandedButton from "@/components/forms/BrandedButton.vue";
import FormInput from "@/components/forms/FormInput.vue";
import FormLabel from "@/components/forms/FormLabel.vue";
import FormSelect from "@/components/forms/FormSelect.vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
store.getContacts();
const handleSubmit = async (e) => {
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const phoneNumbers = formData.getAll("phone-number");
  const phoneNumbersTypes = formData.getAll("phone-number-type");

  const newContact = {
    ...data,
    id: Math.floor(Math.random() * 100000000000),
    starred: false,
    primaryNumber: parseInt(data["primary-number"], 10) - 1 || 0,
    phoneNumbers: phoneNumbers.map((n, i) => ({
      number: n,
      type: phoneNumbersTypes[i],
    })),
  };
  await store.createContact(newContact);

  router.push(`/contacts/${newContact.id}`);

  console.log(newContact);
  console.log(newContact);
};

let numPhoneNumbers = ref(1);

const addPhoneNumber = () => numPhoneNumbers.value++;
const removePhoneNumber = () =>
  numPhoneNumbers.value > 1 && numPhoneNumbers.value--;
</script>

<template>
<div class="wrapper">

  <form @submit.prevent="handleSubmit">
    <h1>Create A Contact</h1>
    <p>Enter details below to create a contact.</p>
    <FormLabel>First Name <FormInput name="firstName" required /></FormLabel>
    <FormLabel>Last Name <FormInput name="lastName" required /></FormLabel>
    <FormLabel>Salutation <FormInput name="salutation" /></FormLabel>
    <FormLabel
      >Avatar
      <FormInput type="file" name="avatar" accept="image/png, image/jpeg" />
    </FormLabel>
    <FormLabel>Company Name <FormInput name="company-name" /></FormLabel>
    <div class="phone-numbers">
      <div class="phone-number" v-bind:key="n" v-for="n in numPhoneNumbers">
        <FormLabel for="phone-number">Phone Number</FormLabel>
        <div class="inputs">
          <FormInput name="phone-number" type="tel" required />
          <FormSelect name="phone-number-type">
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
        <FormSelect name="primary-number">
          <option v-for="n in numPhoneNumbers" v-bind:key="n" :value="n">
            {{ n }}
          </option>
        </FormSelect>
      </FormLabel>
    </div>
    <BrandedButton class="primary" type="submit">Submit</BrandedButton>
  </form>
  </div>
</template>

<style>
.wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

form > h1 {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
}

form > p {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0;
}
.phone-numbers .buttons {
  margin-left: auto;
}
.phone-number .inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .phone-number .inputs {
    display: grid;
    grid-template-columns: 1.618fr 1fr;
  }
}
</style>
