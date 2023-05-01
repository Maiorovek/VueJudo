<template>
    <section class="header-section">
        <div class="wrapper">
            <div class="header-section__inner">
                <div class="header-section__logo">

                </div>
                <AppHeaderList/>
            </div>
        </div>
    </section>
</template>

<script>
import AppHeaderList from "~/components/header/AppHeaderList.vue";

export default {
   name: "AppHeader",
   components: {
      AppHeaderList
   },
}
</script>

<style scoped>

</style>
