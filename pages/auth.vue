<template>
    <form class="auth__inner">
        <div class="auth-title">
            Авторизация
        </div>
        <inputCustom
          :placeholder="'Логин'"
          :type="'text'"
          :title="'логин'"
          :name="'login'"
          :isError="errorString.value === 'auth/invalid-email' || errorString.type === 'login'"
          v-model:modelValue="loginValue"
          :error="errorString.value"
        />
        {{errorString.type === 'login'}}
        {{errorString.type === 'password'}}
        <inputCustom
          :placeholder="'Пароль'"
          :type="'password'"
          :title="'пароль'"
          :name="'password'"
          :isError="errorString.value === 'auth/missing-password' || errorString.type === 'password'"
          :error="errorString.value"
          v-model:modelValue="passwordValue"
        />
        <button @click.prevent="login" class="auth-button">Войти</button>
    </form>
</template>

<script setup>
import { useStore } from "~/store";
import InputCustom from "~/components/ui/input-custom.vue";
import loginAuth from "~/server/login";

const loginValue = ref('')
const passwordValue = ref('')
const data = ref([])
const errorString = ref('')

const login = () => {
    if (validateInput('login', loginValue.value) && validateInput('password', passwordValue.value)) {
        loginAuth(loginValue.value, passwordValue.value)
    }
    console.log(errorString)
}
const resetError = () => {
    errorString.value = ''
    errorString.type = ''
    useStore().setErrorAuth('')
}
const errorAuth = computed(() => useStore().getErrorAuth)

watch(() => useStore().getErrorAuth, () => {
    errorString.value = errorAuth
});

watch(() => loginValue.value, (actual, next) => {
    if (next !== actual) resetError()
});

watch(() => passwordValue.value, (actual, next) => {
    if (next !== actual) resetError()
});

const validateInput = (inputType, inputValue) => {
    if (!inputValue) {
        errorString.type = inputType
        errorString.value = "Это поле обязательно для заполнения";
        return false
    }

    if (inputType === "login") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
            errorString.type = 'login'
            errorString.value = "Введите действительный адрес электронной почты";
        }
        return false
    }

    if (inputType === "password") {
        if (inputValue.length < 8) {
            errorString.type = 'login'
            errorString.value = "Пароль должен содержать не менее 8 символов";
        }
        return false
    }

    return true
}

definePageMeta({
   layout: "auth",
});
useHead({
   title: `Авторизация`,
})
</script>
