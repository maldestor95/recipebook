<template>
  <div>
    <v-container fluid>
      <group-form v-for="experience in exp" :key="experience.id"
      :label="experience.mission"
      :label2="experience.date">
      <v-container fluid>
        <v-row dense>
          <v-col><h3>{{experience.company}}</h3></v-col>
          <v-col align='end'><h3>{{experience.location}}</h3></v-col>
        </v-row>
        <h4>Objectif</h4>
        <p class="objectif">{{experience.objectifs}}</p>
        <h4>Tâches</h4>
        <ul>
          <li v-for="task in experience.tasks" :key="task.id">
            {{ task }}
          </li>
        </ul>
      </v-container>
        <!-- {{ experience }} -->
      </group-form>
    </v-container>
        <!--

        {{exp.mission | capital}}

        <span><v-icon>mdi-domain</v-icon>{{company | capital}}</span>
        <span><v-icon>mdi-calendar</v-icon>de {{startDate}} à {{endDate}}
        <span><v-icon>mdi-map-marker</v-icon>{{location}}</span>
        </span>

        <div v-if="markPreview" v-html="markPreview"></div>
        <img v-for="pic in exp.pics" :key="pic.id" :src='pic' :alt='pic'/>
         -->

  </div>
</template>

<script>
import groupForm from './groupform'

export default {
  components: {
    groupForm
  },
  props: {
    exp: {
      type: Array,
      default: () => {
        return [{
          mission: 'Chef de projet drone ANAFI',
          date: '2010-2015',
          company: 'Parrot'
        }]
      }
    }
  },
  computed: {
    startDate () {
      return this.exp.date.replace(/-.*$/, '')
    },
    endDate () {
      return this.exp.date.replace(/^.*-/, '')
    },
    company () {
      return this.exp.company.replace(/@.*$/, '')
    },
    location () {
      return this.exp.company.replace(/^.*@/, '')
    }
  },
  filters: {
    capital: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  }
}

</script>

<style lang="scss" scoped>
.objectif {
  font-style: italic;
  text-align: justify;
}
</style>
