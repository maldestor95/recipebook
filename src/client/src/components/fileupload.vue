<template>
  <div>
    <v-btn color="info" @click="reset()">re-init</v-btn>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input
          type="file"
          :multiple="multiple"
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          class="input-file"
          :accept="accept"
        />
        <p v-if="isInitial">
          <span v-if="multiple">Drag your files here to begin</span>
          <span v-else>Drag your file here to begin</span>

          <br />or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
      </div>
    </form>
    <v-alert type="info" v-if="isSuccess">{{uploadedFiles}}</v-alert>
    <v-alert type="error" v-if="isFailed">{{uploadError}}</v-alert>
  </div>
</template>

<script>
import * as axios from "axios";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  props: {
    destination: {
      type: String,
      default: ""
    },
    accept: { type: String, default: "image/*" },
    multiple: { type: Boolean, default: true }
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos"
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      axios
        .post(`/newres/${this.destination}`, formData)
        .then(x => {
          this.uploadedFiles = x.data;
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      let formData = new FormData();

      if (!fileList.length) return;

      for (let inc = 0; inc < fileList.length; inc++) {
        formData.append(fieldName, fileList[inc], fileList[inc].name);
      }

      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>