<template>
  <div>
    <h1>SandBox</h1>
    <input id="fileItem" type="file" accept=".pdf" />
    <div
      id="output"
      style="min-height: 200px; white-space: pre; border: 1px solid black;"
      ondragenter="document.getElementById('output').textContent = ''; event.stopPropagation(); event.preventDefault();"
      ondragover="event.stopPropagation(); event.preventDefault();"
      ondrop="event.stopPropagation(); event.preventDefault();
     dodrop(event);"
    >DROP FILES HERE FROM FINDER OR EXPLORER</div>
  </div>
</template>

<script>
export default {
  name: "SandBox",
  components: {},
  data() {
    return {
      testmoment: "none"
    };
  },
  created() {},
  methods: {
    dodrop: function(event) {
      var dt = event.dataTransfer;
      var files = dt.files;

      var count = files.length;
      this.output("File Count: " + count + "\n");

      for (var i = 0; i < files.length; i++) {
        this.output(
          " File " +
            i +
            ":\n(" +
            typeof files[i] +
            ") : <" +
            files[i] +
            " > " +
            files[i].name +
            " " +
            files[i].size +
            "\n"
        );
      }
    },
    output: function(text) {
      document.getElementById("output").textContent += text;
      //dump(text);
    }
  }
};
</script>

<style lang="scss" scoped></style>
