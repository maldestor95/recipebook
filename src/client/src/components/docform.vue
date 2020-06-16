<template>
  <div id="supplier">
    <div v-for="(elt,eltname) in dataFormat" :key="elt.id">
      <v-container v-if="elt=='Image'&dataIn.hasOwnProperty('data')" fluid>
        <v-row justify="space-around">
          <v-card v-for="pic in dataIn.data[eltname]" :key="pic.id" max-width="500" raised>
            <v-card-title primary-title>{{pic}}</v-card-title>
            <v-card-text>
              <img :src="'res/'+pic" :alt="pic" class="pics" />
            </v-card-text>
            <v-card-actions>
              <v-icon class="red--text" v-if="editable" @click="delPic(pic)">mdi-delete-circle</v-icon>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
      <div v-else>
        <div v-if="typeof(elt)==='object'">
          <div v-for="(item,name) in elt" :key="item.id">
            <v-text-field
              :label="name"
              v-model="dataIn.data[eltname][name]"
              v-if="isDefined(eltname,name)"
              :disabled="!editable"
            ></v-text-field>
          </div>
        </div>
        <div v-else>
          <v-text-field
            :label="elt"
            v-model="dataIn.data[eltname]"
            :disabled="!editable"
            v-if="dataIn.data"
          ></v-text-field>
        </div>
      </div>
    </div>
    <img-upload @ApplyImage="uploadImgToS3Blob" :pictureName="dataIn.id" v-if="editable"></img-upload>
    err - {{err}}
    DEBUG - {{debug}}
  </div>
</template>

<script>
import imgUpload from "./imgupload";
import docaxios from "../mixins/mixin_doc";

export default {
  mixins: [docaxios],
  components: {
    imgUpload
  },
  model: {
    prop: "dataIn",
    event: "change"
  },
  props: {
    dataIn: {
      type: Object,
      default: () => {
        return { id: "", data: { image: [] } };
      }
    },
    dataFormat: {
      type: Object,
      default: () => {
        return {
          nom: "Nom",

          image: "Image"
        };
      }
    },
    editable: { type: Boolean, default: false }
  },
  data() {
    return {
      data: { ...this.dataIn.data },
      loading: false,
      blankDoc: {
        categorie: this.dataIn.categorie,
        id: "",
        data: {
          adresse: {
            adresse: "",
            complementAdresse: "",
            notes: "",
            nom: "",
            prenom: "",
            societe: ""
          }
        },
        image: []
      },
      debug: "null",
      err: null
    };
  },
  watch: {
    dataIn(newValue) {
      this.data = Object.assign({}, newValue.data);
    }
  },
  computed: {},
  methods: {
    isDefined(eltname, name) {
      try {
        return this.data[eltname][name].length > -1;
      } catch (error) {
        return false;
      }
    },
    prepareName() {
      let fname = this.dataIn.id + ".jpg";
      let dIn = this.dataIn.data;
      const keyName = `${this.dataIn.categorie}/${fname}`;
      if (dIn.hasOwnProperty("image")) {
        dIn.image.push(keyName);
      } else {
        dIn["image"] = [];
        dIn["image"].push(keyName);
      }
    },

    uploadImgToS3Blob(blob) {
      let fname = this.dataIn.id + ".jpg";
      let dIn = this.dataIn.data;
      let keyName = `${this.dataIn.categorie}/${fname}`;

      if (dIn.hasOwnProperty("image")) {
        keyName = `${this.dataIn.categorie}/${dIn.image.length}_${fname}`;
        dIn.image.push(keyName);
      } else {
        dIn["image"] = [];
        dIn["image"].push(keyName);
      }
      Promise.all([
        this.postFileToS3(this.dataIn.categorie, this.dataIn.id, blob, keyName),
        this.putDoc(this.dataIn.categorie, this.dataIn.id, dIn)
      ])
        .then(res => {
          this.loading = false;
          this.debug = res;
        })
        .catch(err => {
          this.loading = false;
          this.err = err;
        });
    },
    delPic(picKey) {
      this.dataIn.data.image = this.dataIn.data.image.filter(x => x != picKey);
      this.loading = true;
      Promise.all([
        this.delFileOnS3(picKey),
        this.putDoc(this.dataIn.categorie, this.dataIn.id, this.dataIn.data)
      ])
        .then(res => {
          this.loading = false;
          this.debug = res;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pics {
  max-width: 100%;
  max-height: 200px;
}
.v-card {
}
.v-card__title {
  font-style: italic;
  font-weight: bold;
  font-size: 80%;
  font-family: cursive;
}
.v-card__text {
  background-color: blue;
}
</style>