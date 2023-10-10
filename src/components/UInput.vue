<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  nameInput: String,
  id: String,
  type: String,
  name: String,
  placeholder: String,
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    class="form-input_style"
    :id="id"
    :type="type"
    :name="name"
    @input="
      $event.target &&
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :value="modelValue"
  />
</template>
