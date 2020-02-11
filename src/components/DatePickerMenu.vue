<template>
  <div>
    <v-text-field
      class="text-center"
      :name="name"
      :label="label"
      :id="id"
      :value="SelectDate"
      @focus="ShowPicker = true"
      @blur="ShowPicker = false"
      @keyup.esc="ShowPicker = false"
      @keyup.enter="ShowPicker = false"
      v-if="ShowPicker == false"
    >
    </v-text-field>
    <v-dialog v-model="ShowPicker" width="500">
      <v-date-picker
        v-model="SelectDate"
        type="month"
        @blur="ShowPicker = false"
        @change="$emit('input', SelectDate)"
      >
        v-if="ShowPicker == true"
        <p align-center>Select Start Date</p>
        <v-btn text color="primary" @click="ShowPicker = false">Quit</v-btn>
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
