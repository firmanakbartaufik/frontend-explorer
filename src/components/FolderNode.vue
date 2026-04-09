<script setup>
import { ref } from 'vue'
import FolderNode from './FolderNode.vue' // ✅ WAJIB (recursive)

const props = defineProps({
  node: Object,
})

const emit = defineEmits(['select'])

const isOpen = ref(true) // buka default supaya kelihatan

function toggle() {
  isOpen.value = !isOpen.value
}

function selectFolder() {
  emit('select', props.node)
}
</script>

<template>
  <li>
    <div class="node">
      <!-- Toggle -->
      <span v-if="node.children?.length" class="toggle" @click.stop="toggle">
        {{ isOpen ? '-' : '+' }}
      </span>

      <!-- Folder -->
      <span class="folder" @click="selectFolder"> 📁 {{ node.name }} </span>
    </div>

    <!-- Children -->
    <ul v-if="isOpen && node.children?.length">
      <FolderNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @select="$emit('select', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>
.node {
  display: flex;
  align-items: center;
}

.toggle {
  width: 20px;
  cursor: pointer;
}

.folder {
  cursor: pointer;
}
</style>
