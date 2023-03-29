<template>
  <teleport to="head">
    <title>{{ title }}</title>
    <meta :name="name" :content="content" />
  </teleport>
</template>
<script setup>
const props = defineProps({
  title: String,
  name: String,
  content: String,
});
</script>