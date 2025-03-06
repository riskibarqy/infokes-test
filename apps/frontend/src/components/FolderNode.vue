<template>
    <li>
      <span @click="toggleFolder">
        <span class="icon">{{ expanded ? "📂" : "📁" }}</span>
        <span class="name">{{ folder.name }}</span>
      </span>
      <ul v-if="expanded" class="nested-list">
        <FolderNode v-for="child in folder.children" 
                    :key="child.id" 
                    :folder="child" 
                    @fileSelected="emit('fileSelected', $event)" />
        <li v-for="file in folder.files" :key="file.id" @click.stop="selectFile(file)">
          <span>📄 {{ file.name }}</span>
        </li>
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps(["folder"]);
  const emit = defineEmits(["fileSelected"]);
  
  const expanded = ref(false);
  
  const toggleFolder = () => {
    expanded.value = !expanded.value;
  };
  
  const selectFile = (file) => {
    emit("fileSelected", file);
  };
  </script>
  
  <style scoped>
  .nested-list {
    padding-left: 20px;
    margin-left: 5px;
  }
  
  span {
    display: flex;
    align-items: center;
  }
  
  .icon {
    width: 20px;
    text-align: center;
  }
  
  .name {
    flex-grow: 1;
  }
  
  li > span:hover {
    background: rgb(77, 77, 77);
    border-radius: 5px;
  }
  </style>
  