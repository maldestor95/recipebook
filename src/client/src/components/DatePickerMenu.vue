<template>
  <div>
    <v-text-field
      outlined
      dense
      :append-icon="'mdi-calendar'"
      @click:append="ShowPicker = true"
      class="text-center"
      :name="name"
      :label="label"
      :id="id"
      :value="SelectDate"
      @blur="ShowPicker = false"
      @keyup.esc="ShowPicker = false"
      @keyup.enter="ShowPicker = false"
      v-if="ShowPicker == false"
    ></v-text-field>
    <v-dialog v-model="ShowPicker" width="500">
      <v-date-picker v-model="SelectDate" @blur="ShowPicker = false">
        <v-btn
          text
          color="primary"
          @click="
            ShowPicker = false;
            $emit('input', SelectDate);
          "
        >Quit</v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default: "Date"
    },
    id: {
      type: String,
      default: "id"
    },
    name: {
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      SelectDate: this.value,
      ShowPicker: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
