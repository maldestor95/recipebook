<template>
  <div>
    <v-btn class="blue lighten-1 white--text" @click="$router.push('loginapp')">
      <span>
        <v-icon small>
          {{
          loginstate? "mdi-logout" : "mdi-login"
          }}
        </v-icon>
      </span>
      <v-spacer></v-spacer>
      <span color="white">{{loginstate ? " logout" : " login"}}</span>
    </v-btn>

  </div>
</template>

<script>


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
 
    };
  },
  computed: {
loginstate(){return this.$store.state.username!=null}
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
