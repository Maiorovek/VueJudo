<template>
  <section class="news-section">
      <div class="title-section">

      </div>
  </section>
</template>

<script>
export default {
  name: "news-section",
  data() {
    return {
      image: '123123',
    }
  },
  methods: {
    async decoder() {
      console.log(await decoderImage(this.$refs.myFiles))
    }
  },
}
</script>

<style scoped>

</style>
