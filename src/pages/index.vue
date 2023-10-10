<script setup lang="ts">
import UForm from "../components/UForm.vue";
import { ref } from "vue";
import type { Form } from "../interface/index";

const formData = ref<Form>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  publicProfile: true,
  position: {
    frontendDeveloper: "Frontend Developer",
    backendDeveloper: "Backend Developer",
  },
});
</script>

<template>
  <UForm :formData="formData" />
</template>
