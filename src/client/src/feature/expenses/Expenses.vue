<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="1">
        <date-picker-menu
          label="from"
          name="fromdate"
          id="fromdateid"
          v-model="SelectStartDate"
        ></date-picker-menu>
      </v-col>
      <v-col cols="1">
        <date-picker-menu
          label="To"
          name="Todate"
          id="Todateid"
          v-model="SelectStopDate"
        ></date-picker-menu>
      </v-col>
      <v-col cols="7">
        <v-text-field name="FilterString" label="Search" id="id"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn color="success">Add</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      dense
      :headers="headers"
      :items="items"
      item-key="name"
    >
    </v-data-table>
    <div class="d-flex flex-row mb-8 bord ">
      <v-btn color="success">T1</v-btn>
      <v-btn color="success">T2</v-btn>
    </div>
  </div>
</template>

<script>
import {store} from "../store.js";
import DatePickerMenu from "@/components/DatePickerMenu";
import SeedE from "../seedExpenses.js";
export default {
  name: "Expenses",
  components: {
    DatePickerMenu
  },
  data() {
    return {
      SelectStartDate: new Date().toISOString().substr(0, 7),
      SelectStopDate: new Date().toISOString().substr(0, 7),
      storeState: store.state,
      singleSelect: false,
      selected: [],
      headers: SeedE.state.headers,
      items: SeedE.state.items
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.bord {
  border-color: black;
  border-style: solid;
}
</style>
