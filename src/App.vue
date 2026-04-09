<script setup>
import Explorer from './views/Explorer.vue'
</script>

<template>
  <div class="app">
    <header class="header">📁 Folder Explorer</header>

    <div class="container">
      <Explorer />
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  background: #1e293b;
  color: white;
  padding: 12px 20px;
  font-weight: bold;
}

.container {
  flex: 1;
  overflow: hidden;
}
</style>
