<template>
  <section class="header-section">
    <div class="wrapper">
      <div class="header-section__inner">
        <div class="header-section__logo">
          <img src="https://judoforpeace.net/WebRoot/vilkasfi02/Shops/2017042517/MediaGallery/International-Judo-Federation-IJF-logo.png" alt="logo">
        </div>
        <AppHeaderList />
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
