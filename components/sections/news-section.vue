<template>
  <section class="news-section">
    <input type="file" ref="myFiles" @change="decoder" multiple>
    <img :src="image" alt="">
    {{ image }}
  </section>
</template>

<script>
import decoderImage from "~/utils/decoder-image";
export default {
  name: "news-section",
  data() {
    return {
      image: '123123'
    }
  },
  methods: {
    decoder() {
      console.log(decoderImage(this.$refs.myFiles))
    }
  },
}
</script>

<style scoped>

</style>
