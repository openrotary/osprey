<template>
  <g>
    <defs>
      <marker
        :id="`start-arrow${data.mid}`"
        viewBox="0 0 40 40"
        markerUnits="strokeWidth"
        markerWidth="6"
        markerHeight="6"
        refX="-40"
        refY="16"
        orient="auto"
      >
        <path d="M40,0L0,20L40,40L40,0 z" fill="#000"></path>
      </marker>
      <marker
        :id="`end-arrow${data.mid}`"
        narkerUnits="storkeWidth"
        viewBox="0 0 40 40"
        refX="75"
        refY="20"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M0,0L40,20L0,40L0,0 z" fill="#000"></path>
      </marker>
    </defs>
    <path
      class="o-line"
      :d="getLinePath()"
      stroke="#000"
      stroke-dasharray="0"
      stroke-width="5"
      marker-start="none"
      :marker-end="`url(#end-arrow${data.mid})`"
      fill="none"
    ></path>
  </g>
</template>

<script>
export default {
  name: 'Line',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    lockElement: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getLinePath() {
      const [startX, startY, endX, endY, ..._ctrls] = this.data.position
      return `M${startX} ${startY}C${_ctrls.join(' ')} ${endX} ${endY}`
    }
  }
}
</script>

<style>
</style>