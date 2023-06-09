<template>
    <section class="header-section">
        <div class="wrapper">
            <div class="header-section__inner">
                <NuxtLink :to="'/'" class="header-section__logo">
                    <img src="../../assets/images/icon.png" alt="">
                </NuxtLink>
                <AppHeaderList/>
                <div class="header-section__phone">
                    <a v-if="phone" :href="`tel:${phone.param}`" v-text="phone.param"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import AppHeaderList from "~/components/header/AppHeaderList.vue";
import { useStore } from "~/store";

const store = useStore()
const phone = computed(() => store.getSiteSettingParam('phone'))
</script>

<style scoped></style>
