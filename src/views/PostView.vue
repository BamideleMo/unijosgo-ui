
<template>
  <SuperMeta :title="title" name="description" content="UniJosGist curates, create, & share fun
                and interesting perspectives & activities Jossites will enjoy." />
  <div class="">
    <h1 class="h1 font-semibold text-lg">Post</h1>
    <div class="mt-4">
      <div class="">
        <CKEditor class="h-90 border-2" :editor="ClassicEditor" v-model="editorData" @ready="onReady" @input="onChange">
        </ckeditor>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>