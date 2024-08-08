<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    :style="{
      fontWeight: 600
    }"
  >
    {{ msg }}
  </div>
</template>
