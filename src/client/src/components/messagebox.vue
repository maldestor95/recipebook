<template>
  <v-card raised outlined :max-width="cardWidth">
    <v-card-title>
      <span class="headline">
        <slot name="title">Message Box Title</slot>
      </span>
    </v-card-title>

    <v-card-text>
      <slot>default content</slot>
    </v-card-text>

    <v-card-actions>
      <slot name="actions">
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('cancel')" v-if="cancel">Annuler</v-btn>
        <v-btn color="green darken-1" text @click="$emit('ok')">OK</v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    cancel: {
      type: Boolean,
      default: false
    },
    cardWidth: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>