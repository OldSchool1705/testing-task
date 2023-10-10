<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from "vue";
import UInput from "./UInput.vue";
import USelect from "./USelect.vue";

const position = ref("");
const checked = ref(true);

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:data"]);

const handleUpdateData = (option: string) => {
  position.value = option;
};

// Это быстрое решение для тестового. По хорошему, нужно обводить input красным, если он пустой или не валидный (если это email) и, соответственно, переписать всю логику.
const fromValidation = computed(() => {
  return (
    checked.value &&
    position.value !== "" &&
    props.formData.password === props.formData.confirmPassword
  );
});


const isErrorCheckbox = computed(() => {
  return !checked.value ? false : true;
});

const submit = async () => {
  const url = "https://lmstestapi.reezonly.com/v1/user/signup";
  
  if (fromValidation.value) {
    try {
      const dataToSend = {
        errors: null, 
        name: props.formData.name,
        email: props.formData.email,
        password: props.formData.password,
        confirmPassword: props.formData.confirmPassword,
        position: position.value,
      };
      // throw error
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
      } else {
        //тут описание ошибки в network или вынесли логику в отдельную функцию.
        const responseData = await response.json();
        dataToSend.errors = responseData.errors;
        console.log(`Error message: ${response.statusText}`);
      }
    } catch (error: any) {
      console.log(`Network error: ${error.message}`);
    }
  }
};
</script>

<template>
  <h3 class="title-form">Регистрация</h3>
  <form class="form" @submit.prevent="submit">
    <div class="form-boxSwitch">
      <div class="form-boxSwitch-switchTitle">
        <label class="switch">
          <input type="checkbox" checked />
          <span class="slider round"></span>
        </label>
        <p>Публичный профиль</p>
      </div>
      <span
        >Включает профиль для просмотра другими пользователями по ссылке</span
      >
    </div>

    <p class="form-titleData">Данные</p>
    <div class="form-flexBox">
      <div class="form-flexBox-input form-flexBox-style">
        <UInput
          v-model="props.formData.name"
          id="name"
          type="name"
          name="name"
          nameInput="Имя"
          placeholder="Имя"
        />
        <UInput
          v-model="props.formData.email"
          id="email"
          type="email"
          name="email"
          nameInput="Email"
          placeholder="Email"
          :required="true"
        />
        <UInput
          v-model="props.formData.password"
          id="password"
          type="password"
          name="password"
          nameInput="password"
          placeholder="Пароль"
          :required="true"
        />
      </div>
      <div class="form-flexBox-select">
        <USelect
          @update:data="handleUpdateData"
          :data="props.formData.position"
        />
        <UInput
          v-model="props.formData.confirmPassword"
          id="password"
          type="password"
          name="confirmPassword"
          nameInput="confirmPassword"
          placeholder="Повторите пароль"
          :required="true"
        />
      </div>
    </div>
    <div class="form-checkbox">
      <label
        for="checkbox"
        class="container"
        :class="[isErrorCheckbox ? 'text-checkbox' : 'text-error']"
      >
        Нажимая на кнопку “Регистрация”, я подтверждаю свое согласение с
        политикой <br />
        конфиденциальности и обработки персональных данных
        <input type="checkbox" id="checkbox" v-model="checked" />
        <span class="checkmark"></span>
      </label>
    </div>

    <div class="form-box">
      <button class="form-box-btn" type="submit">Регистрация</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.title-form {
  border-radius: 15px 15px 0px 0px;
  background: #fdfdfd;
  padding: 27px 20px;
  border-bottom: 1px solid #e6e6eb;

  color: #000;
  font-family: Montserrat;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: 27px;
}
.form {
  border-radius: 0px 0px 15px 15px;
  background: #fdfdfd;
  padding: 27px 34px 42px 20px;
  @media (max-width: 400px) {
    padding: 10px;
  }
  &-boxSwitch {
    border-bottom: 1px solid #e6e6eb;
    padding-bottom: 30px;
    margin-bottom: 20px;
    &-switchTitle {
      display: flex;
      label {
        display: block;
        margin-right: 20px;
      }
      p {
        color: #000;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 19px;
        margin-bottom: 10px;
      }
    }
    span {
      display: block;
      color: #696977;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
    }
  }
  &-titleData {
    margin-bottom: 24px;
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
  &-flexBox {
    display: flex;

    @media (max-width: 400px) {
      flex-direction: column;
    }
    &-select {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      @media (max-width: 400px) {
        flex-direction: column-reverse;
        width: 100%;
        input {
          margin-bottom: 10px;
        }
      }
    }
    &-input {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      min-height: 197px;
      @media (max-width: 400px) {
        justify-content: flex-start;
        min-height: 0;
        width: 100%;
        input {
          margin-bottom: 10px;
        }
      }
    }
    &-style {
      margin-right: 10px;
      @media (max-width: 400px) {
        margin-right: 0;
      }
    }
  }

  h3 {
    color: #000;
    font-size: 19px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px;
    margin-bottom: 27px;
  }
  &-input_style {
    outline: none;
    border-radius: 11px;
    border: 1px solid #e6e6eb;
    width: 100%;
    padding: 12px 0 12px 10px;
    color: #9292a0;
  }
  &-box {
    display: flex;
    justify-content: center;
  }
  &-box-btn {
    border-radius: 9px;
    border: 1px solid #07a86e;
    width: 100%;
    max-width: 234px;
    padding: 10px 12px;
    background: transparent;
    cursor: pointer;

    color: #07a86e;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    transition: all 0.3s ease-in;
    &:hover {
      background: #07a86e;
      color: #fff;
    }
  }
  &-checkbox {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    padding: 25px 0px 42px 0px;
    width: 100%;
    border-top: 1px solid #e6e6eb;

    input {
      display: block;
      margin-right: 15px;
    }
    p {
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
    }
  }
}
.text-error {
  color: red;
}
.text-checkbox {
  color: #000;
}
</style>
