<template>
  <v-card outlined class="d-flex flex-wrap">
    <v-textarea
      outlined
      filled
      auto-grow
      :value="processDescription"
      v-model="processDescription"
      @keydown="$emit('input',processDescription)"
      v-if="editable"
    ></v-textarea>
    <span v-html="processDescriptionMarked"></span>
  </v-card>
</template>

<script>
import marked from "marked";

export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: "# Texte par defaut"
    }
  },
  data() {
    return {
      processDescription: this.value
    };
  },
  computed: {
    processDescriptionMarked() {
      return marked(this.value);
    }
  },
  watch: {
    value(newValue) {
      this.processDescription = newValue;
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
</style>