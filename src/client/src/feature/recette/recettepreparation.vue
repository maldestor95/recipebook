<template>
  <div class="d-flex flex-wrap ">
  <h1>
      Préparation
    </h1>
    <section>
      <div v-html="processDescriptionMarked" />
    </section>
  </div>
</template>

<script>
import marked from "marked";
import {store} from "../../store/index"
export default {
  computed: {
    processDescriptionMarked() {
        return marked(store.state.recette.recette.processDescription)
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