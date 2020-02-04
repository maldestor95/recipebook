<template>
<v-app>
    <v-app-bar dense app color="primary" dark>
        <v-icon @click="navdrawer=!navdrawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <h1>{{currentApp}}</h1>
        <v-spacer></v-spacer>
        <login-user color="info"></login-user>
    </v-app-bar>
    <v-content>
        <v-navigation-drawer temporary v-model="navdrawer">
            <v-list dense>
                <v-subheader>TOOLS</v-subheader>
                
            </v-list>
            
        </v-navigation-drawer>
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
        navdrawer:null,
        currentApp:"Current Application"
    }),
};
</script>
