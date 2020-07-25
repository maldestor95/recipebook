<template>
  <div>
    <v-icon v-for="checked in val" :key="checked.id" class='circle menuFont--text' x-small>mdi-circle</v-icon>
    <v-icon v-for="unchecked in max-val" :key="unchecked.id" class='circle menuFont--text' x-small>mdi-circle-outline</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: Number,
      default: 2
    },
    max: {
      type: Number,
      default: 5
    }
  }
}
</script>

<style lang="scss" scoped>
.circle {
  color:$col-pen;
}
</style>
