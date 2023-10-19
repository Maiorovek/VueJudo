<template>
    <div class="burger">
        <button 
            class="burger-button"
            :class="{'opened':burgerIsOpen}" 
            @click="changeStateBurgerMenu"
        >
            <span class="bar-top"></span>
            <span class="bar-mid"></span>
            <span class="bar-bot"></span>
        </button>
        <ul 
            class="burger-list" 
            :class="{'list-active':burgerIsOpen}"
        >
            <li class="burger-list__item" v-for="item in menuList" @click="changeStateBurgerMenu">
                <NuxtLink :to="item.link">
                    {{ item.title }}
                </NuxtLink>
            </li>
            <a v-if="phone" :href="`tel:${phone.param}`" v-text="phone.param"/>
            

        </ul>
    </div>
</template>

<script setup>
import { state } from "@/store/state"
import { useStore } from "~/store";

const store = useStore()
const phone = computed(() => store.getSiteSettingParam('phone'))
const menuList = computed(() => state().getMenuList)

const burgerIsOpen = ref(false)
const changeStateBurgerMenu = () => burgerIsOpen.value = !burgerIsOpen.value
</script>
