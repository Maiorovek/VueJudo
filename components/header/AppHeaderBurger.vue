<template>
    <div class="burger">
        <button class="burger-button" @click="changeStateBurgerMenu">
            Кнопка
        </button>
        <ul class="burger-list">
            <li class="burger-list__item" v-for="item in menuList">
                <NuxtLink :to="item.link">
                    {{ item.title }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useStore } from "~/store";

const burgerIsOpen = ref(false)

const changeStateBurgerMenu = () => burgerIsOpen.value = !burgerIsOpen.value

const menuList = computed(() => useStore().getMenuList)
</script>
