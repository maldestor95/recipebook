<template>
<v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
        <v-btn v-on="on">
            <v-icon>{{islogged==true?'mdi-logout':'mdi-login'}}</v-icon>
        </v-btn>
    </template>

    <v-card v-if="islogged">
        <v-row>
            <v-col md12>
                <p>Are you sure you want to log out?</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col md3>
                <v-btn color="primary" @click="logout">confirm</v-btn>
            </v-col>
            <v-col md9>
                <v-btn color="primary" @click="dialog=false">
                    <v-icon>mdi-cancel</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
    <v-card v-if="!islogged">
        <v-text-field name="username" outlined label="Username or email address"></v-text-field>
        <v-row>
            <v-col md6>
                <p>forgot password?</p>
            </v-col>
        </v-row>
        <v-text-field name="password" outlined label="password"></v-text-field>
        <v-btn color="primary" @click="login">Login</v-btn>
        <v-btn color="primary" @click="dialog=false">
            <v-icon>mdi-cancel</v-icon>
        </v-btn>
    </v-card>

</v-dialog>
</template>

<script>
export default {
    props: {
        logged: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            islogged: this.logged,
            dialog: false
        }
    },
    methods: {
        logout() {
            this.dialog = false
            this.islogged = false
        },
        login() {
            this.dialog = false
            this.islogged = true
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

vfor
