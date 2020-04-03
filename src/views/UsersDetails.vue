<template>
    <div>
<v-form>
    <v-text-field filled label="Address" v-model="details.address" ></v-text-field>
    <v-text-field filled label="Email" v-model="details.email"></v-text-field>
    <v-text-field filled label="Phone" v-model="details.phone"></v-text-field>
    <v-btn rounded color="primary" dark @click="sendForm">Submit</v-btn>
</v-form>
    </div>
</template>

<script>
    export default {
        props: {
            'details':{type:Object}
        },
        data() {
            return {
                Ddetails:this.details,
            }
        },
        methods: {
            sendForm() {
                let resp={
                    address :this.details.address?this.details.address:null,
                    email   :this.details.email?this.details.email:null,
                    phone   :this.details.phone?this.details.phone:null,
                    login:this.details.login
                }
                this.$emit('change',resp)
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>