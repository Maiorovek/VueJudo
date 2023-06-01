<template>
    <button
      class="button"
      :class="{'disabled': props.isDisabled, 'loading': props.isLoading}"
      :disabled="props.isDisabled">
        <v-icon v-if="props.icon" :icon="'mdi-' + props.icon"/>
        <span v-if="!isLoading" v-text="props.text"/>
        <vLoader v-if="props.isLoading"/>
    </button>
</template>

<script setup>
import VLoader from "~/components/ui/v-loader.vue";

const props = defineProps({
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
})
</script>
