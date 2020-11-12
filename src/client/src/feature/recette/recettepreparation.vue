<template>
  <div >
    <h1> Préparation</h1>
    <section class="d-flex flex-wrap ">
      <div v-html="processDescriptionMarked" />
    </section>
  </div>
</template>

<script>
import marked from "marked";
export default {
  props: {
    value: {
      type: String,
      default: "Process Description"
    },
  },
  computed: {
    processDescriptionMarked() {
        return marked(this.value)
    }
  }
  
};
</script>

<style lang="scss" scoped>
.outlined {
  border-style: solid;
  border-color: blue;
  background-color: lightgray;
}
h1 { font-size: large;}
</style>