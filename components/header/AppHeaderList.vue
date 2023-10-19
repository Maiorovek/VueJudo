<template>
    <ul class="header-section__list">
        <li class="header-section__item" v-for="item in menuList">
            <NuxtLink :to="item.link">
                {{ item.title }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup>
import { state } from "@/store/state"

const menuList = computed(() => state().getMenuList)
</script>
