<script setup>
defineProps({
  folders: Array,
  files: Array,
})

const emit = defineEmits(['open-folder'])

function openFolder(folder) {
  emit('open-folder', folder)
}
</script>

<template>
  <div class="grid">
    <!-- FOLDERS -->

    <div
      v-for="folder in folders"
      :key="'folder-' + folder.id"
      class="folder-card"
      @dblclick="openFolder(folder)"
    >
      📁 {{ folder.name }}
    </div>

    <!-- FILES -->

    <div v-for="file in files" :key="'file-' + file.id" class="file-card">📄 {{ file.name }}</div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 12px;
}

.folder-card {
  border: 1px solid #ddd;
  padding: 12px;
  cursor: pointer;
  background: #f0f9ff;
}

.file-card {
  border: 1px solid #ddd;
  padding: 12px;
  background: #fafafa;
}

.folder-card:hover,
.file-card:hover {
  background: #e5e7eb;
}
</style>
