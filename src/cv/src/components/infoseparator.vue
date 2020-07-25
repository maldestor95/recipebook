<template>
<div class='infoseparator'>
    <span class='square'></span>
    <span class='text'><slot ></slot></span>
    <span class='square'></span>

</div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.infoseparator {
    display: flex;
    justify-content: space-between;
}
.square {
    background-color: $col-pen;
    border-radius: 3px;
    width: 10%;
    height: 10px;
    position: relative;
    top: 8px;
}
.text {
    width:80%;
    color:$col-pen;
    text-align: center;
font-size: 20px;
font-family: 'Open Sans', sans-serif;
}
</style>
