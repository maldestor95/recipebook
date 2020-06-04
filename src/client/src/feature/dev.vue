<template>
  <div>
    <p>Page pour le développement de composants ou de Features</p>
    <v-container grid-list-xs>
      <v-expansion-panels>
        <v-expansion-panel expand focusable>
          <v-expansion-panel-header>msgbox with slot</v-expansion-panel-header>
          <v-expansion-panel-content>
            <msgbox
              @cancel="state='cancel';activate=false"
              @ok="state='ok';activate=false"
              cancel
              :cardWidth="400"
              v-model="activate"
            >
              <template v-slot:title>custom Title</template>
              <template v-slot:header>
                <h1>Le titre de ma page</h1>
              </template>
              mon message
            </msgbox>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel expand focusable>
          <v-expansion-panel-header>jpg from S"</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-img src="res/pics/new.jpg" alt="new.jpg" height="400" width="400" contain></v-img>
            <!-- <img src="res/pics/new.jpg" alt="new.jpg"> -->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel expand focusable>
          <v-expansion-panel-header>Upload</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field rounded outlined label="destination" v-model="destination"></v-text-field>
            <file-upload :destination="destination" :multiple="true"></file-upload>

            <list-file></list-file>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel expand focusable>
          <v-expansion-panel-header>Image upload & crop</v-expansion-panel-header>
          <v-expansion-panel-content>
            <img-upload></img-upload>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!--
      <v-expansion-panel expand focusable>
        <v-expansion-panel-header>
          BLANK for future usage
        </v-expansion-panel-header>
        <v-expansion-panel-content>

        </v-expansion-panel-content>
      </v-expansion-panel>
        -->
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import msgbox from "../components/messagebox";
import fileUpload from "../components/fileupload";
import listFile from "../components/listfiles";
import imgUpload from "../components/imgupload";
export default {
  components: {
    msgbox,
    fileUpload,
    listFile,
    imgUpload
  },
  data() {
    return {
      state: "none",
      activate: false,
      destination: "pics"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>