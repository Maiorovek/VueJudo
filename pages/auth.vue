<template>
    <form class="auth__inner">
        <div class="auth-title">
            Авторизация
        </div>
        <input-custom
          :placeholder="'Логин'"
          :type="'text'"
          :title="'логин'"
          :name="'login'"
          :isError="errorAuth.type === 'login'"
          :error="errorAuth.value"
          v-model="loginValue"
        />
        <input-custom
          :placeholder="'Пароль'"
          :type="'password'"
          :title="'пароль'"
          :name="'password'"
          :isError="errorAuth.type === 'password'"
          :error="errorAuth.value"
          v-model="passwordValue"
        />
        <v-button
          @click.prevent="login"
          class="auth-button"
          :text="'Войти'"
          :isLoading="buttonLoad.value"
          :isDisabled="buttonLoad.value"
        />
    </form>
</template>

<script setup>
import VButton from "~/components/ui/v-button.vue";

definePageMeta({
   layout: "auth",
});
useHead({
   title: `Авторизация`,
})

import { authError } from "~/store/authError";
import InputCustom from "~/components/ui/input-custom.vue";
import loginAuth from "~/server/login";

const loginValue = ref('')
const passwordValue = ref('')
const data = ref([])
const buttonLoad = ref(false)

const login = () => {
   if (validateInput('login', loginValue.value) && validateInput('password', passwordValue.value)) {
      buttonLoad.value = true
      loginAuth(loginValue.value, passwordValue.value)
   }
}

const resetError = () => {
   buttonLoad.value = false
   authError().setErrorAuth('', '')
}
const errorAuth = computed(() => authError().getErrorAuth)

watch(() => loginValue.value, (actual, next) => {
   if (next !== actual && errorAuth.value !== '') resetError()
});

watch(() => passwordValue.value, (actual, next) => {
   if (next !== actual && errorAuth.value !== '') resetError()
});

const validateInput = (inputType, inputValue) => {
   if (!inputValue) {
      authError().setErrorAuth('Это поле обязательно для заполения', inputType)
      buttonLoad.value = true
      return false
   }

   if (inputType === "login") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
         authError().setErrorAuth('Некорректный адрес электронной почты', inputType)
         buttonLoad.value = true
         return false
      }
   }

   if (inputType === "password") {
      if (inputValue.length < 8) {
         authError().setErrorAuth('Пароль должен содержать не менее 8 символов', inputType)
         buttonLoad.value = true
         return false
      }
   }

   return true
}
</script>
