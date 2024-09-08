<template>
  <WangEditor v-model="editVal" height="calc(100vh - 180px)" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"

const editVal = ref("Hello! WangEditor")
watchEffect(() => {
  console.log(editVal.value)
})
</script>

<style scoped></style>
