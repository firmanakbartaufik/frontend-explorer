<script setup>
import { ref, onMounted, computed } from 'vue'

import FolderTree from '../components/FolderTree.vue'
import FolderList from '../components/FolderList.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

import { fetchFolderTree, fetchChildren, fetchFiles } from '../api/api.js'

const treeData = ref([])
const childrenData = ref([])
const filesData = ref([])
const searchQuery = ref('')
const selectedFolder = ref(null)
const breadcrumb = ref([])

onMounted(async () => {
  const flatData = await fetchFolderTree()

  treeData.value = buildTree(flatData)
})

async function handleSelect(folder) {
  selectedFolder.value = folder

  childrenData.value = await fetchChildren(folder.id)

  filesData.value = await fetchFiles(folder.id)

  updateBreadcrumb(folder)
}

function updateBreadcrumb(folder) {
  breadcrumb.value = []

  let current = folder

  const map = createFolderMap(treeData.value)

  while (current) {
    breadcrumb.value.unshift(current)

    current = map[current.parentId]
  }
}

function createFolderMap(tree) {
  const map = {}

  function walk(nodes) {
    nodes.forEach((n) => {
      map[n.id] = n

      if (n.children) walk(n.children)
    })
  }

  walk(tree)

  return map
}

function buildTree(list) {
  const map = {}
  const roots = []

  list.forEach((item) => {
    item.children = []

    map[item.id] = item
  })

  list.forEach((item) => {
    if (item.parentId) {
      map[item.parentId]?.children.push(item)
    } else {
      roots.push(item)
    }
  })

  return roots
}

const filteredFolders = computed(() => {
  if (!searchQuery.value) return childrenData.value

  return childrenData.value.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const filteredFiles = computed(() => {
  if (!searchQuery.value) return filesData.value

  return filesData.value.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="explorer">
    <!-- LEFT PANEL -->

    <div class="left-panel">
      <FolderTree :items="treeData" @select="handleSelect" />
    </div>

    <!-- RIGHT PANEL -->

    <div class="right-panel">
      <!-- TOP BAR -->

      <div class="top-bar">
        <Breadcrumb :items="breadcrumb" @navigate="handleSelect" />

        <input
          v-model="searchQuery"
          placeholder="🔍 Search files & folders..."
          class="search-input"
        />
      </div>

      <!-- CONTENT -->

      <FolderList
        v-if="selectedFolder"
        :folders="filteredFolders"
        :files="filteredFiles"
        @open-folder="handleSelect"
      />

      <div v-else class="empty">Select folder to view contents</div>
    </div>
  </div>
</template>

<style scoped>
.explorer {
  display: flex;
  height: 100%;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 10px;
}

.right-panel {
  flex: 1;
  padding: 16px;
}

.empty {
  color: #999;
}

.toolbar {
  margin-bottom: 12px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 12px;
}

/* Breadcrumb tetap di kiri */
.top-bar :deep(.breadcrumb) {
  flex: 1;
}

/* Search di kanan */
.search-input {
  width: 260px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }
}
</style>
