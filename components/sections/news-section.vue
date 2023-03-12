<template>
  <section class="news-section">
    <input type="file" ref="myFiles" @change="decoder" multiple>
    <img :src="image" alt="">
  </section>
</template>

<script>
import decoderImage from '@/utils/decoder-image'
export default {
  name: "news-section",
  data() {
    return {
      image: ''
    }
  },
  methods: {
    decoder(event) {
       this.image = decoderImage(event.target)
    }
  },
}
</script>

<style scoped>

</style>
