<template>
  <div>
    <h1>CAVE</h1>
    <doclist v-model="list" type="text" :dataFormat="dataFormat"></doclist>
  </div>
</template>

<script>
import doclist from "../components/doclist";
export default {
  components: {
    doclist
  },
  data() {
    return {
      list: {
        categorie: "cave",
        headers: [
          {
            text: "Nom",
            align: "start",
            sortable: true,
            value: "data.nom"
          },
          { text: "millesime", value: "data.millesime", sortable: true },
          { text: "Id", value: "id" },
          { test: "Image", value: "image"}
        ]
      },
      dataFormat: {
        nom: "Nom",
        millesime: "Millesime",
        image: 'Image'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>