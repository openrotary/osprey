<template>
  <circle
    :cx="getPosition[0]"
    :cy="getPosition[1]"
    :r="data.radius || 10"
    :fill="isLock ? '#4269e1' : '#000'"
    @mousedown.left="handleMousePoint($event, true)"
    @mouseup.left="handleMousePoint($event, false)"
  ></circle>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isLock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getPosition() {
      const { position } = this.data
      return position
    }
  },
  methods: {
    handleMousePoint(e, bool) {
      if (bool) {
        e.preventDefault()
        e.stopPropagation()
        this.$emit('down-point', this.data.mid)
        return
      }
      console.log('end')
      this.$emit('up-point', null)
      return
    }
  }
}
</script>

<style lang="stylus" scoped></style>