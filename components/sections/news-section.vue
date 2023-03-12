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
    Decoder() {
      let file = this.$refs.myFiles.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.image = reader.result
      }
      reader.readAsDataURL(file);
    }
  },
}
</script>

<style scoped>

</style>
