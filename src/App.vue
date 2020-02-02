<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <login-user color="info"></login-user>
    </v-app-bar>
    <v-content>
        <v-container justify-center>
            <v-row>
            </v-row>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import LoginUser from './components/LoginUser.vue'

export default {
    name: 'App',

    components: {
        LoginUser

    },

    data: () => ({
        //
    }),
};
</script>
