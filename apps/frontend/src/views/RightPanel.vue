<template>
  <div class="right-panel">
    <div v-if="file" class="file-preview">
      <span class="file-icon">📄</span>
      <p>{{ file.name }}</p>
    </div>
    <p v-else>Select a file to preview</p>
  </div>
</template>

<script setup>
defineProps(["file"]);
</script>

<style scoped>
.right-panel {
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  width: 100%;
}

.file-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.file-icon {
  font-size: 50px;
}
</style>
