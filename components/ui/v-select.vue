<template>
    <div class="select">
        <div class="title" @click="openSelect" v-text="placeholder"/>
        <div class="list" v-if="showSelect">
      <span
        v-for="item in list"
        v-text="item.name"
        @click="selectValue(item)"
      />
        </div>
    </div>
</template>

<script>
export default {
   name: "v-select",
   props: {
      placeholder: {
         type: String,
      },
      list: {
         type: Array,
      },
   },
   data() {
      return {
         showSelect: false,
         selectedValue: {},
      }
   },
   methods: {
      openSelect() {
         this.showSelect = !this.showSelect
      },
      selectValue(item) {
         this.selectedValue = item
         this.$emit('selectedValue', this.selectedValue)
      },
   }
}
</script>

<style lang="scss" scoped>
.select {
    position: relative;
    border-radius: 15px;
    border: 1px solid #003882;
    padding: 6px 12px;
    width: 200px;
}

.title {
    text-align: center;
}

.list {
    position: absolute;
    padding: 6px;
    left: 0;
    bottom: 0;

    span {
        display: inline-block;
        width: 100%;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
