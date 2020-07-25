<template>
    <div class="menuFont--text menuBack">

      <v-container fluid>
      <h2>Compétences</h2>

      <v-row >
        <v-col v-for="skillG in skillGroups" :key="skillG.id" align="center">
          <group-form :label="skillG" style="width:300px" :height="gpFormHeight">
            <skill-list :skills="skillsFilteredByGroup(skillG)" align="start"></skill-list>
          </group-form>
        </v-col>
      </v-row>
      <h2>Formation</h2>
      <v-row>
        <v-col v-for="formation in formationsFilteredByGroup ('Diplôme')" :key="formation.id" align="center"
        >
          <group-form
          label="Diplôme" :label2="formation.annee"
          style="width:300px" :height="gpFormHeight"
          >
            <h1>{{formation.nom}}</h1>
            <p align="start">{{formation.topic}}</p>
          </group-form>
        </v-col>
      </v-row>
      </v-container>

    </div>
</template>

<script>
import groupForm from './groupform'
import skillList from './skilllist'
export default {
  components: {
    groupForm, skillList
  },
  props: {
    skills: {
      type: Array,
      default: () => {
        return [{
          nom: 'Management',
          groupe: 'Soft Skills',
          value: 4
        },
        {
          nom: 'Conduite de Projet',
          groupe: 'Soft Skills',
          value: 5
        }
        ]
      }
    },
    formation: {
      type: Array,
      default: () => {
        return [{
          nom: 'Management',
          groupe: 'Soft Skills',
          value: 4
        }]
      }
    }
  },
  data () {
    return {
      skillsFilteredByGroup (groupName) {
        return this.skills.filter(sk => sk.groupe === groupName)
      },
      formationsFilteredByGroup (groupName) {
        return this.formation.filter(sk => sk.groupe === groupName)
      }
    }
  },
  computed: {
    skillGroups () {
      const groupe = [...new Set(this.skills.map(sk => sk.groupe))]
      return groupe
    },
    formationGroups () {
      const groupe = [...new Set(this.formation.map(sk => sk.groupe))]
      return groupe
    },
    gpFormHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': return '200px'
        case 'lg': return '200px'
        case 'md': return '200px'
        case 'xl': return '200px'
        default:
          return 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h2{
  margin-top: 20px;
}
</style>
