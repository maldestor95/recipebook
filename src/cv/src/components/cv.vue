// TODO s'inspirer de https://alpha-creative.vuetifyjs.com/
<template>
  <v-card flat>
    <v-app-bar class='menuBack' dense>
      <v-btn @click="drawer=true" text class="d-sm-none menuBack menuFont--text"><v-icon>mdi-menu</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class='menuFont--text '>LUDOVIC DEPARIS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="menu in menuOptions" :key="menu.id"
        @click="showDetails=menu.name"
        text class="menuBack menuFont--text d-none d-sm-inline"
        :class="{'menuBackSelected':showDetails==menu.name}"
      >
        {{menu.msg}}
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="menuBack">
      <v-list>
        <v-list-item >
          <p class="menuFont--text">Ludovic Deparis</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
        v-for="menu in menuOptions" :key="menu.id"
        @click="showDetails=menu.name; drawer=false"
        >
          <v-icon class="menuFont--text">{{menu.icon}}</v-icon>
          <v-spacer></v-spacer>
          <span class="menuBack menuFont--text">{{ menu.msg }}</span>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <about :cv="cv" v-if="showDetails=='about'" id='about'></about>
    <skills :skills='cv.skills' :formation='cv.formations' v-if="showDetails=='skills'"></skills>
    <experience :exp='cv.exp' v-if="showDetails=='experiences'" class="menuBack menuFont--text"></experience>

  </v-card>
</template>

<script>
import cvData from './cvdata'
import about from './about'
import skills from './skills'
import experience from './experience'
export default {
  components: {
    about, skills, experience
  },
  name: 'cv',
  props: {
    msg: String
  },
  data () {
    return {
      drawer: false,
      showDetails: 'about',
      cv: cvData.cv,
      test: 'test',
      currexp: {},
      menuOptions: [
        { name: 'about', msg: 'A PROPOS', icon: 'mdi-information-variant' },
        { name: 'experiences', msg: 'EXPERIENCE', icon: 'mdi-chart-timeline-variant' },
        { name: 'skills', msg: 'COMPETENCES', icon: 'mdi-medal-outline' }
      ]
    }
  },
  methods: {
    console (event) {
      console.log(event)
    }
  },
  computed: {
    contact () {
      return [{
        icon: 'mdi-email',
        value: this.cv.email
      },
      {
        icon: 'mdi-linkedin',
        value: this.cv.linkedin,
        href: `${this.cv.linkedin}`
      }
      ]
    }
  }
}

</script>
<style scoped lang="scss">
 @import "../styles/variables.scss";

 #cv * {
    color: $col-pen;
    background-color: $col-back;
  }
.black {
  background-color: black;
}
  #skills {
    position: relative;
  }

  #nom,
  #mission {
    color: $col-pen;
    text-align: center;
  }

  .contact {
    padding-left: 10px;
    margin-left: 0px;
    margin-right: 30px;
  }

  .bulletPoint {
    position: absolute;
    right: 5px;
    margin-left: 30px;
    margin-right: 40px;
  }

  .space {
    min-height: 15px;
  }

  h2 {
    border-radius: 15px;
    padding-left: 10px;
    margin-bottom: 20px;
    border: $menuFont solid 1px;
    color: $Font;
    background-color: $menuBack;
  }

  #about {
    color: $Font;
    position: relative;

    h2,
    p {
      max-width: 400px;
    }

    .picture {
      position: absolute;
      left: 500px;
      top: 80px;
      width: 150px;
      height: auto;
      border-radius: 50%;
      border: solid 5px $menuFont;
    }
  }

  @media (max-width: 600px) {
    #about {
      .picture {
        display: none;
      }
    }
  }

  p {
    margin-left: 30px;
    margin-right: 30px;
  }

  .ProfExp>h3 {
    position: relative;
    left: 10px;
  }

  .ProfExp>h4:first-of-type {
    position: absolute;
    top: -15px;
    right: 10px;
  }

  .ProfExp>h4:last-of-type {
    top: 5px;
    position: absolute;
    right: 10px;
  }

  #details,
  #details * {
    background-color: $col3;
    color: $col-back;
  }

  .section {
    min-width: 200px;
  }

</style>
