<template>
    <button class='button'>
        <v-icon v-if="icon" :icon="'mdi-' + icon"/>
        <span v-text="text"/>
    </button>
</template>

<script>
export default {
   name: "v-button",
   props: {
      text: {
         type: String,
         required: true,
      },
      icon: {
         type: String,
         required: false,
      },
      className: {
         type: String,
         default: 'default',
      },
   },
}
</script>
