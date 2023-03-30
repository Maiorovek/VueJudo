<template>
    <form class="auth__inner">
        <div class="auth-title">
            Авторизация
        </div>
        <inputCustom
          :placeholder="'Логин'"
          :type="'text'"
          :title="'логин'"
        />
        <inputCustom
          :placeholder="'Пароль'"
          :type="'password'"
          :title="'пароль'"
        />
        <button @click.prevent="login" class="auth-button">Войти</button>
    </form>
</template>

<script setup>
import {useStore} from "~/store";

const login = () => {
    console.log(123)
}

const siteInfo = computed(() => useStore().getSiteSetting)
definePageMeta({
    layout: "auth",
});
useHead({
    title: `${siteInfo.value.name.param} : Авторизация`,
})
</script>
