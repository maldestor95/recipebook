<template>
  <div>
    <h1 id='title'>
      Ludovic Deparis
    </h1>
    <h1 id='subtitle'>
      Chef de Projet
    </h1>

    <h1 id='about'> A propos de moi</h1>
    <p id='aboutDetails'>
      Vingt années passées dans le développement de systèmes embarqués m’ont permis de démontrer une adaptabilité très
      forte aux changements techniques (Télécom, drones, outils NFC…).

      Mon aisance en anglais est appréciée tout autant que mon enthousiasme et ma rigueur.<br>Je fais monter mes
      collaborateurs en compétences et prends part au développement logiciel ainsi qu’ à la validation du
    </p>
    <h1> Experiences professionnelles.</h1>

    <v-card class='mission'>
      <h1>Chef de projet drone ANAFI</h1>
      <h2 class="date">
        2018-2020
      </h2>
      <h2 class='company'>PARROT </h2>
      <h2 class='location'> PARIS</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Déclinaison d’une version applicative Photogrammétrie et d’une version Défense Sécurité</li>
        <li> Conception d’un outil de validation Express.js+Vue.js du plan de vol (extraction de métadonnées des images
          et
          positionnement sur Mapbox) </li>
        <li> Pilotage de la R&D (Software, validation et qualification Hardware) et coordination avec les services
          Support,
          Achat, Production, Industrialisation, Commerce, Legal</li>
        <li> Support technique pour les clients Défense et Sécurité (France, Suisse, USA)</li>
      </ul>
      ![ANAFIWork.jpg](ANAFIWork.jpg)
    </v-card>

    <v-card class='mission'>

      <h1>Responsable R&D NFC et chargement sans contact</h1>

      <h2> Réalisations</h2>
      <h2 class="date"> 2015-2018</h2>
      <h2 class='company'>MICROPROSS </h2>
      <h2 class='location'> VILLENEUVE-D’ASCQ</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Outils de tests pour le NFC et chargement sans contact (Qi , AirFuel Resonant)</li>
        <li> Participation aux comités normatif en Italie, USA et Japon</li>
        <li> Management de 9 ingénieurs et techniciens (logiciel embarqué, FPGA, électronique)</li>
        <li> Budget - 1.1M€/an sur 8 projets (5 en maintenance, 3 en développement)</li>
        <li> Mise en place des outils Jira et TestLink'</li>
      </ul>
      !['mp500tcL38wpcTester.jpg'](mp500tcL38wpcTester.jpg)
    </v-card>

    <v-card class='mission'>
      <h1>Chef de projet communications sans fil (2G,3G,4G)</h1>
      <h2 class="date"> 2010-2014</h2>
      <h2 class='company'>TIMES REVERSAL COMMUNICATIONS </h2>
      <h2 class='location'> CERGY PONTOISE</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Systèmes embarqués pour Sagem Wireless, ST - Ericsson et Ministère de la Défense</li>
        <li> Gestion d\'obsolescence, transfert de site de production'</li>
        <li> Management fonctionnel de 10 ingénieurs pluridisciplinaires (logiciel temps réel, logiciel applicatif
          Java,
        </li>
        système Linux, électronique, mécanique)'
        <li> Budget - 1.2M€/an sur 3 projets simultanés'</li>
      </ul>
      !['ANAFIWork.jpg'](ANAFIWork.jpg)

    </v-card>

    <v-card class='mission'>
      <h1>Coordinateur métier électronique</h1>
      <h2> Réalisations</h2>
      <h2 class="date"> 2002-2009</h2>
      <h2 class='company'>SAGEM MOBILES </h2>
      <h2 class='location'> CERGY-PONTOISE</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Conception de la Radio de 7 téléphones mobiles, volume moyen de 400K pièces par an</li>
        <li> Automatisation du banc de réglage radio en Python</li>
        <li> Encadrement fonctionnel de 4 collaborateurs</li>
        <li> Interface technique avec les fournisseurs et les autres métiers (BE, logiciel, industrialisation,
          production, certification)</li>
      </ul>

      !['ANAFIWork.jpg']()

    </v-card>

    <v-card class='mission'>
      <h1>Ingénieur d’étude RadioFréquence</h1>
      <h2 class="date">1999-2002 </h2>
      <h2 class='company'>FILTRONIC COMTEK </h2>
      <h2 class='location'> SHIPLEY(UK)</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Conception d’amplificateurs RF pour Station de Base GSM</li>
        <li> Automatisation du paramétrage du logiciel de simulation (VBA</li>
      </ul>
      !['amplifiers.jpg', 'awr.png'],()
    </v-card>

    <v-card class='mission'>
      <h1>Ingénieur logiciel</h1>
      <h2 class="date"> 1998-1999</h2>
      <h2 class='company'>CHATAIN BLANCHON </h2>
      <h2 class='location'> MAISONS ALFORT</h2>
      <h2> Réalisations</h2>
      <ul>
        <li> Développement driver modem sans fil (assembleur & C)</li>
      </ul>
    </v-card>
  </div>
</template>

<script>
import marked from 'marked'
import cvmd from './cv.md'
export default {

  data () {
    return {
      cv: cvmd,
      h2L: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.update()
    })
  },
  methods: {
    markPreview () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        smartLists: true,
        smartypants: false
      })
      return marked(this.cv)
    },
    update () {
      const h1 = document.getElementById('exp').getElementsByTagName('h1')
      this.h2L = Array.from(h1).map(v => {
        return v.textContent
      })
      //   document.querySelector('#Exp').style.color= rgb(0,255,255)
      console.log(h1)
      console.log(this.cv)
    }
  },
  filters: {
    stringify: function (value) {
      return JSON.stringify(value)
    }
  },
  computed: {
    h2List () {
      const ExpSection = document.getElementById('exp').getElementsByTagName('h1')
      return ExpSection
    }
  }
}

</script>

<style lang="scss" scoped>
  ::v-deep .title {
    color: red;
  }

  ::v-deep #subtitle {
    color: red;
  }

  ::v-deep #about {

    color: red;

  }

  ::v-deep #Exp {
    color: green
  }

</style>
