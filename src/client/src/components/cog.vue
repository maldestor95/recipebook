<template>
<div>

        <inline-svg 
            class="COGpath"
            src="cog.svg" 
            :width="width"
            :height="height"
            aria-label="My image"    
        ></inline-svg>
</div>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 30
            },
            height:{type:Number,default:30}
        },
    }
</script>

<style lang="scss" scoped>
$back:#2196F3;
$out:white;
.COGpath {
  fill: $out;
  background-color: $back;
  margin-top: 7px;
  padding: 5 5 5 5;
  border-radius: 1rem;
}
.COGpath:hover {
    fill: $out;
  padding: 10 5 5 5;
  border: $out solid 2px;
  background-color: $back;
  border-radius: 1rem;
}
</style>