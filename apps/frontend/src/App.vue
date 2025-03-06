<script setup lang="ts">
import { ref } from "vue";
import LeftPanel from './views/LeftPanel.vue'
import RightPanel from './views/RightPanel.vue'

const selectedFile = ref(null);

const handleFileSelected = (file : any) => {
  selectedFile.value = file;
};

</script>

<template>
  <div class="container">
    <LeftPanel class="left-panel"  @fileSelected="handleFileSelected" />
    <RightPanel class="right-panel" :file="selectedFile" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  width: 100vh;
  height: 100vh;
  grid-template-areas: "left right";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.left-panel {
  grid-area: left;
  border-right: solid;
}
.right-panel {
  grid-area: right;
}
</style>
