<template>
  <span>
    <template v-if='src.indexOf("foods/") >= 0'>
      <cloud-storage-image :filePath='src'/>
    </template>
    <span v-else v-html='src'>
    </span>
  </span>
</template>
<script>
import CloudStorageImage from '@/components/CloudStorageImage.vue'
export default {
  components: {
    CloudStorageImage
  },
  props: {
    src: {
      default: undefined,
      type: String
    }
  }
}
</script>
<style>
</style>


