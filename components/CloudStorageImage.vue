<template>
  <img :src='url' width='100%'>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  props: {
    filePath: {
      default: undefined,
      type: String
    }
  },
  data() {
      return {
        url: undefined
      }
  },
  watch: {
    filePath: {
      async handler(nv) {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(nv)
        this.url = await fileRef.getDownloadURL()
      },
      immediate: true
    }
  }
}
</script>
<style>
</style>


