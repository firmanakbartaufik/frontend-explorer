<script setup>
defineProps({
  items: Array,
})

const emit = defineEmits(['navigate'])

function go(folder) {
  emit('navigate', folder)
}
</script>

<template>
  <div v-if="items.length" class="breadcrumb">
    <span v-for="(item, i) in items" :key="item.id">
      <span class="crumb" @click="go(item)">
        {{ item.name }}
      </span>

      <span v-if="i < items.length - 1"> / </span>
    </span>
  </div>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 12px;
}

.crumb {
  cursor: pointer;
  color: #2563eb;
}

.crumb:hover {
  text-decoration: underline;
}
</style>
