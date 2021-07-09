<template>
  <circle
    :cx="getPosition[0]"
    :cy="getPosition[1]"
    :r="data.radius || 10"
    :fill="isLock ? '#4269e1' : '#000'"
    @mousedown.stop="handlePressdown"
    @mouseup.stop="handlePressup"
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
    handlePressdown() {
      this.$emit('down-point', this.data.mid)
    },
    handlePressup() {
      this.$emit('up-point', null)
    }
  }
}
</script>

<style lang="stylus" scoped></style>