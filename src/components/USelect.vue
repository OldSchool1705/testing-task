<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  data: Object
});


const emit = defineEmits(["update:data"]);

const value = ref("Должность");
const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};

const select = (option: string) => {
  value.value = option;
  visible.value = true;
  emit("update:data", option);
  
};
</script>

<!-- Кастомный select - такое себе решение. Лучше, конечно, брать библиотеку, например, tailwindcss. Он ускоряет разработку. -->
<template>
  <div class="aselect" :data-value="value" :data-list=" props.data">
    <div class="selector" @click="toggle()">
      <div class="label">
        <span>{{ value }}</span>
      </div>
      <div class="arrow" :class="{ expanded: visible }"></div>
      <div :class="{ hidden: !visible, visible }">
        <ul>
          <li
            :class="{ current: item === value }"
            v-for="item in props.data"
            :key="item"
            @click="select(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
