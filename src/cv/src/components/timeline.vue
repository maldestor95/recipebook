<template>
    <div>
        <v-card v-for="item in milestone" :key="item.id" flat @click="$emit('change',item.date)" id="timeline">
            <v-chip>{{item.date}}</v-chip>
            <span>{{item.texte}}</span>
        </v-card>

    </div>
</template>

<script>
import { gsap } from 'gsap'
export default {
  props: {
    milestone: {
      type: Array,
      default: () => {
        return [
          {
            texte: 'Chef de projet drone ANAFI',
            date: '2018'
          },
          {
            texte: 'AutoEntrepreneur',
            date: '2020'
          }
        ]
      }
    }
  },
  mounted () {
    gsap.to('#timeline', { x: 500, duration: 2 })
  }
}
</script>

<style lang="scss" scoped>
.v-card  {
    max-width: 80%;
}
</style>
