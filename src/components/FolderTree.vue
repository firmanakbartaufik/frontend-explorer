<script setup>
import FolderNode from './FolderNode.vue'

defineProps({
  items: Array,
})

const emit = defineEmits(['select'])

function handleSelect(folder) {
  emit('select', folder)
}
</script>

<template>
  <ul class="tree" v-if="items && items.length">
    <FolderNode v-for="item in items" :key="item.id" :node="item" @select="handleSelect" />
  </ul>

  <div v-else>No folders</div>
</template>

<style scoped>
.tree {
  list-style: none;
  padding-left: 10px;
}
</style>
