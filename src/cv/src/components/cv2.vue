<template>
  <div>
    <v-card>
      <v-img></v-img>
      <v-card-title>
          {{cv.nom}}
      </v-card-title>
      <v-card-text>
          {{cv.mission}}
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        A propos de moi
      </v-card-title>
      <v-card-text>
        <div v-html="cv.about"></div>
      </v-card-text>
    </v-card>
    <time-line :milestone="milestone" @change="changeExp($event)"></time-line>
    <experience-view :exp="activeExp" v-if="activeExp"></experience-view>
    <skills></skills>
  </div>
</template>

<script>
import timeLine from './timeline'
import cvData from './cvdata'
import experienceView from './experience'
import skills from './skills'
export default {
  components: {
    timeLine,
    experienceView,
    skills
  },
  data () {
    return {
      cv: cvData.cv,
      activeExp: null
    }
  },
  methods: {
    changeExp (event) {
      this.activeExp = this.cv.exp.filter(v => v.date === event)[0]
    }
  },
  computed: {
    milestone () {
      return this.cv.exp.map(v => {
        return {
          date: v.date,
          texte: v.mission
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  $charcoal: #264653ff;
  $persian-green: #2a9d8fff;
  $orange-yellow-crayola: #e9c46aff;
  $sandy-brown: #f4a261ff;
  $burnt-sienna: #e76f51ff;

</style>
