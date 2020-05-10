<template>
  <v-card outlined >
    <v-container>
      <v-row>
        <v-col cols="4" v-if="editable">
          <v-textarea
            outlined
            filled
            auto-grow
            :value="processDescription"
            v-model="processDescription"
            @keydown="$emit('input',processDescription)"
          ></v-textarea>
        </v-col>
        <v-col >
          <span v-html="processDescriptionMarked"></span>
        </v-col>
      </v-row>
    </v-container>
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
</style>