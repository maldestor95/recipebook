<template>
  <div>
    <h2>{{ storeState.numbers }}</h2>
  </div>
</template>

<script>
import store from "../store.js";
export default {
  name: "Expenses",
  data() {
    return {
      storeState: store.state
    };
  }
};
</script>

<style lang="scss" scoped></style>
