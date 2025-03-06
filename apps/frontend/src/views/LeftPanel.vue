<template>
  <div class="left-panel">
    <h1>File Explorer</h1>
    <ul class="folder-list">
      <FolderNode v-for="folder in folders" 
                  :key="folder.id" 
                  :folder="folder" 
                  @fileSelected="handleFileSelected" />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import FolderNode from "../components/FolderNode.vue";

const folders = ref([]);
const emit = defineEmits(["fileSelected"]);

const processFolders = (data) => {
  return data.map((folder) => ({
    ...folder,
    expanded: false,
    children: folder.children ? processFolders(folder.children) : [],
  }));
};

const fetchFolders = async () => {
  try {
    const res = await fetch("http://localhost:3000/folders/tree");
    if (!res.ok) throw new Error(`Failed to fetch folders: ${res.statusText}`);

    const data = await res.json();
    folders.value = processFolders(data);
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
};

const handleFileSelected = (file) => {
  emit("fileSelected", file);
};

onMounted(fetchFolders);
</script>

<style scoped>
.left-panel {
  padding: 10px;
}

.folder-list {
  list-style-type: none;
  padding-left: 0;
}

ul {
  list-style-type: none;
  padding-left: 20px;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 5px;
  position: relative;
}

li > span {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
}
</style>
