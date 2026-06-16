<script setup lang="ts">
</script>

<template>
  <div class="flex h-[calc(100vh-57px)] print:flex print:h-auto">
    <aside class="no-print w-[480px] min-w-0 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
      <slot name="form" />
    </aside>
    <main class="flex flex-1 items-start justify-center overflow-y-auto bg-gray-100 p-8 print:overflow-visible print:p-0 print:bg-white">
      <slot name="preview" />
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  aside {
    width: 100%;
  }
  main {
    display: none;
  }
}
</style>
