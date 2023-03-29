<template>
  <teleport to="body">
    <div
      v-show="modalActive"
      class="fixed bg-cover w-full bg-black bg-opacity-90 h-screen top-0 left-0 flex justify-center px-8"
    >
      <div
        v-if="modalActive"
        class="p-4 bg-black rounded-lg border-2 border-green-400 drop-shadow-lg self-start mt-20 w-11/12 sm:w-2/5 lg:w-1/4"
      >
        <div
          @click="$emit('close-modal')"
          class="bg-green-400 cursor-pointer hover:text-green-600 rounded-bl-lg rounded-br-lg w-20 py-2 text-xs -mt-5 text-center text-black float-right"
        >
          Close
        </div>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["close-modal"]);
</script>

<style lang="scss" scoped>
</style>