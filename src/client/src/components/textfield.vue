<template>
    <div>
        <input :value="value" 
        @keyup="$emit('input',$event.target.value)"
        :disabled="disabled"
        />
        <v-icon @click="$emit('input','')" color="#ccc">mdi-close-circle-outline</v-icon>
    </div>
</template>

<script>
    export default {
        name:"textfield",
        props: {
            value: {
                type: String,
                default: ""
            },
            disabled: {type:Boolean,default:false}
},
data() {
    return {
        valueIn :this.value
    }

},
    }
</script>

<style lang="scss" scoped>
input {
      height: 25px;
      margin: 0 auto;
      border:solid 1px #ccc;
      border-radius: 10px;
      z-index: 5;
}

</style>