<template>
    <section class="header-section">
        <div class="wrapper">
            <div class="header-section__inner">
                <NuxtLink :to="'/'" class="header-section__logo">
                    <img src="../../assets/images/icon.png" alt="">
                    <div v-if="windowWidth <= 768" class="header-section__mobile">
                    Федерация борьбы дзюдо г. Магнитогорска
                </div>
                </NuxtLink>
                <AppHeaderList v-if="windowWidth > 768"/>
                <div v-if="windowWidth > 768" class="header-section__phone">
                    <a v-if="phone" :href="`tel:${phone.param}`" v-text="phone.param"/>
                </div>
                <AppHeaderBurger v-if="windowWidth <= 768"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import AppHeaderBurger from "~/components/header/AppHeaderBurger.vue"
import AppHeaderList from "~/components/header/AppHeaderList.vue";
import { useStore } from "~/store";

const store = useStore()
const phone = computed(() => store.getSiteSettingParam('phone'))

const windowWidth = ref(window.innerWidth);
const handleResize = () => windowWidth.value = window.innerWidth;

window.addEventListener('resize', handleResize);

</script>
