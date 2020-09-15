<template>
    <div class='outerBox ' :style="`height:${height}`">
        <div class='menuFont--text menuBack'
        :class="{labelIn:labelLength>15, labelTop:labelLength<16}">{{label}}</div>
        <div class='label2 menuFont--text menuBack'>{{label2}}</div>

        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'label for groupForm component'
    },
    label2: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    labelLength () {
      return this.label.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.outerBox {
    border-radius: 10px;
    border: solid 1px;
    position:relative;
    padding: 20px;
    margin-top: 15px;
}
  .labelTop{
      position: absolute;
      top: -12px;
      left: 20px;
      color: $menuFont;
      padding: 0px 10px 0px 10px;
  }
.labelIn {
 text-align: center;
 color: $menuFont;
      padding: 0px 10px 0px 10px;
}
  .label2 {
      position: absolute;
      top: -12px;
      right: 20px;
      color: $menuFont;
      padding: 0px 10px 0px 10px;
  }

</style>
