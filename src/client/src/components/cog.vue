<template>
<span class="COG" >
    <inline-svg 
        class="COGpath"
        src="cog.svg" 
        :width="width"
        :height="height"
        aria-label="My image"    
    ></inline-svg>
    <span class="title" v-if="showTitle">
        LDEPARIS
    </span>
</span>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 30
            },
            height:{type:Number,default:30},
            showTitle:{type:Boolean,default:true}
        },
    }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800');
$back:#2196F3;
$out:white;
.COG {
    display: flex;
    align-items: center;
}
.COGpath {
  fill: $out;
  background-color: inherit;
  border-radius: 1rem;
}
.COGpath:hover {
    fill: $out;
  border: $out solid 2px;
  border-radius: 1rem;
}
.title {
  text-transform: capitalize;
  padding-left: 0.2em;
  color: white;
font-size: xx-large !important;
  font-family: 'Nunito','sans-serif' !important;//'Courier New', Courier, monospace;
}
</style>