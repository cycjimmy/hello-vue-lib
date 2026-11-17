<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from '@/index'

const msg = ref('Hello world!')
</script>

<template>
  <HelloWorld :msg="msg" />
</template>
