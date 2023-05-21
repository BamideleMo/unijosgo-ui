
<script setup>
import { ref } from "vue";
import SuperMeta from "../../components/SuperMeta.vue";


const title = "Make Post";

</script>
<template>
  <SuperMeta :title="title" name="description" content="UniJosGist curates, create, & share fun
                and interesting perspectives & activities Jossites will enjoy." />
  <div class="">
    <h1 class="h1 font-semibold text-lg">All Posts</h1>
    <div class="mt-4 space-y-6 text-black">
    </div>
  </div>
</template>


<style lang="scss" scoped></style>