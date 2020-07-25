<template>
    <div>
        <div v-for="formation in formations" :key="formation.id" style="width:300px">
          <group-form class="gpFormHeight" height="gpFormHeight" label="Diplome" :label2="formation.annee">
                <h1 class='formationName'>
                        {{ formation.nom }}
                </h1>
                <p>{{ formation.topic }}</p>
            </group-form>
        </div>
    </div>
</template>

<script>
import groupForm from './groupform'
export default {
  components: {
    groupForm
  },
  props: {
    formations: {
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
  },
  computed: {
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
.formationName {
    max-width: 300px;
    min-width: 200px;
    margin-right: 110px;
}
</style>
