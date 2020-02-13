<template>
  <v-form v-model="valid" @submit.prevent>
    <v-container fluid>
      <v-row class="outlined">
        <v-col cols="1">
          <v-text label="id" v-model="ExpenseEntry.id"></v-text>
        </v-col>
        <v-col>
          <v-text-field
            v-model="ExpenseEntry.description"
            label="Description"
            :rules="descriptionRules"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="ExpenseEntry.category"
            label="Category"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field v-model="ExpenseEntry.date" label="Date"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field v-model="ExpenseEntry.cost" label="Cost"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success" @click="submit()">submit</v-btn>
        </v-col>
        <v-col>
          <v-btn color="success">cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {
          id: 0,
          description: "test",
          category: "cat test",
          date: "20/12/2019",
          cost: 123
        };
      }
    }
  },
  data() {
    return {
      valid: false,
      ExpenseEntry: {
        id: this.value.id,
        description: this.value.description,
        category: this.value.category,
        date: this.value.date,
        cost: this.value.cost
      },
      descriptionRules: [
        v => !!v || "description is required",
        v => v.length > 0 || "description must be at least 0 char"
      ]
    };
  },
  methods: {
    submit() {
      this.$emit("input", this.ExpenseEntry);
    }
  }
};
</script>

<style lang="scss" scoped>
.outlined {
  border-style: solid;
  border-color: blue;
}
</style>
