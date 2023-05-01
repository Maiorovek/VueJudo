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
          :isError="errorString.value === 'auth/invalid-email'"
          v-model:modelValue="loginValue"
          :error="errorString.value"
        />
        <inputCustom
          :placeholder="'Пароль'"
          :type="'password'"
          :title="'пароль'"
          :name="'password'"
          :isError="errorString.value === 'auth/missing-password'"
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

const login = () => loginAuth(loginValue.value, passwordValue.value)
const resetError = () => {
    errorString.value = ''
    useStore().setErrorAuth('')
}
const errorAuth = computed(() => useStore().getErrorAuth)

watchEffect( () => {
    errorString.value = errorAuth
})

watch(() => loginValue.value, (prev, next) => {
    if (next !== prev) {
        resetError()
    }
});

watch(() => passwordValue.value, (prev, next) => {
    if (next !== prev) {
        resetError()
    }
});


definePageMeta({
   layout: "auth",
});
useHead({
   title: `Авторизация`,
})
</script>
