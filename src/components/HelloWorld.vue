<script setup lang="ts">
interface Props {
  msg: string
}

defineProps<Props>()
</script>

<template>
  <div class="hello-world">
    {{ msg }}
  </div>
</template>

<style lang="scss" scoped>
.hello-world {
  // Declared explicitly so the idiomatic ordering rule stays exercised.
  display: block;
  font-weight: 600;
}
</style>
