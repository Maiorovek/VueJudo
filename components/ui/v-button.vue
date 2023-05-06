<template>
    <button
      class="button"
      :class="{'disabled': isDisabled, 'loading': isLoading}"
      :disabled="isDisabled">
        <v-icon v-if="icon" :icon="'mdi-' + icon"/>
        <span v-if="!isLoading" v-text="text"/>
        <vLoader v-if="isLoading"/>
    </button>
</template>

<script>
import vLoader from '~/components/ui/v-loader.vue'

export default {
   name: "v-button",
   components: {
      vLoader
   },
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
      isLoading: {
         type: Boolean
      },
      isDisabled: {
         type: Boolean
      },
   },
}
</script>
