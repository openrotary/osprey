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
        refY="20"
        orient="auto"
      >
        <path d="M40,0L0,20L40,40L40,0 z" :fill="color || '#000'"></path>
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
        <path d="M0,0L40,20L0,40L0,0 z" :fill="color || '#000'"></path>
      </marker>
    </defs>
    <line
      stroke-width="2"
      :stroke="color || '#000'"
      :x1="data.position[0]"
      :y1="data.position[1]"
      :x2="data.position[2]"
      :y2="data.position[3]"
      :marker-start="data.isSingle ? '' : `url(#start-arrow${data.mid})`"
      :marker-end="`url(#end-arrow${data.mid})`"
    ></line>
  </g>
</template>

<script>
export default {
  name: 'MLine',
  props: {
    data: {
      type: Object | null,
      default: null
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style>
</style>