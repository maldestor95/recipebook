<template>
    <v-container fluid >
      <h2>A propos de moi</h2>
      <v-row>
          <v-col>
            <p v-html="cv.about"></p>
          </v-col>
          <v-col cols="4" class="d-none d-sm-flex" align="center">
            <v-img src='../assets/photoLudoTrimmed.jpg' class="picture" :width="picSize.width" :height="picSize.height" />
          </v-col>
      </v-row>
      <h2>Contact </h2>
      <div v-for="cont in contact" :key='cont.id'>
        <v-icon class='contact' color="white">{{cont.icon}}</v-icon>
        <span v-if="cont.href"><a :href="'http://'+cont.href" target="_blank">{{cont.href}}</a></span>
        <span v-else>{{cont.value}}</span>
      </div>

    </v-container>
</template>

<script>
export default {
  props: {
    cv: {
      type: Object,
      default: () => { return { about: 'tt' } }
    }
  },
  mounted () {
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
      },
      {
        icon: 'mdi-crosshairs-gps',
        value: this.cv.location
      }

      ]
    },
    picSize () {
      // console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': return { width: '400px', height: '400px' }
        case 'md': return { width: '500px', height: '500px' }
        default:
          return { width: '500px', height: '500px' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .contact {
    padding-left: 10px;
    margin-left: 0px;
    margin-right: 30px;
    color: red;
  }
  .picture {
    border-radius: 30%;
    border: solid 5px $menuFont;
  }
</style>
