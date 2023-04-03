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
          :error="false"
          v-model:modelValue="loginValue"
        />
        <inputCustom
          :placeholder="'Пароль'"
          :type="'password'"
          :title="'пароль'"
          :name="'password'"
          :error="false"
          v-model:modelValue="passwordValue"
        />
        <button @click.prevent="login" class="auth-button">Войти</button>
        <button @click.prevent="logout" class="auth-button">Выйти</button>
    </form>
</template>

<script setup>
import { useStore } from "~/store";
import InputCustom from "~/components/ui/input-custom.vue";
import loginAuth from "~/server/login";
import logoutAuth from "~/server/logout";

const loginValue = ref('')
const passwordValue = ref('')
const data = ref([])

const login = () => loginAuth(loginValue.value, passwordValue.value)

const logout = () => logoutAuth

const siteInfo = computed(() => useStore().getSiteSetting)
definePageMeta({
   layout: "auth",
});
useHead({
   title: `${siteInfo.value.name.param} : Авторизация`,
})
</script>
