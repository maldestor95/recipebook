<template>
    <v-container class="menuFont--text" fluid>
        <v-row v-for="skill in skills" :key="skill.id">
            <div class='skillName'>
                    {{ skill.nom }}
            </div>
            <bullet-point :val="skill.value" class='bulletpoint'></bullet-point>
        </v-row>
    </v-container>
</template>

<script>
import bulletPoint from './bulletpoint'
export default {
  components: {
    bulletPoint
  },
  props: {
    skills: {
      type: Array,
      default: () => {
        return [
          {
            nom: 'Conception mécanique',
            groupe: 'Hardware',
            value: 3
          },
          {
            nom: 'Anglais (famille bilingue)',
            groupe: 'Langues',
            value: 5
          }

        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.skillName {
    max-width: 300px;
    min-width: 200px;
    margin-right: 110px;
}
.bulletpoint {
    position:absolute;
    right: 10px;
}
</style>
