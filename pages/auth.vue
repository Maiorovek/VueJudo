<template>
  <div class="auth__inner">
    <div class="auth-title">
      Авторизация
    </div>
    <button class="auth-button">Войти</button>
  </div>
</template>

<script>

import {useStore} from "~/store";

export default {
  setup() {
    const siteInfo = computed(() => useStore().getSiteSetting)
    definePageMeta({
      layout: "auth",
    });
    useHead({
      title: `${siteInfo.value.name.param} : Авторизация`,
    })
  },
}
</script>
