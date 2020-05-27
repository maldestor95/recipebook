<template>
  <div>
    <v-btn class="blue lighten-1 white--text" @click="$router.push('login')">
      <span>
        <v-icon small>
          {{
          value? "mdi-logout" : "mdi-login"
          }}
        </v-icon>
      </span>
      <v-spacer></v-spacer>
      <span color="white">{{value ? " logout" : " login"}}</span>
    </v-btn>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  components: {},
  props: {
    logged: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      storeState: store.state,
    };
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.borderout {
  border-color: black;
  border-style: solid;
}
</style>
