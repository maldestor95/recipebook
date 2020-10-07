<template>
  <v-card raised outlined :max-width="cardWidth">
    <h2 class="title">
      <slot name="title">Message Box Title</slot>
    </h2>
    <p class="text">
      <slot>default content</slot>
    </p>
    <p class='action'>

      <slot name="actions">
        <v-btn color="green darken-1" text @click="$emit('cancel')" v-if="cancel">Annuler</v-btn>
        <v-btn color="green darken-1" text @click="$emit('ok')">OK</v-btn>
      </slot>
    </p>
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
.title {
  text-transform: capitalize;
  padding: 1rem;
}
.title,
.text {
  text-align: center;
  margin: 0px;
}

.text {
  padding-top: 0;
}

.action {
  text-align: center;
}

</style>