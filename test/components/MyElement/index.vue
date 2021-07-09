<template>
  <div
    id="canvas"
    class="canvas"
    @mouseup.stop="handleClickCanvas($event)"
    @mousemove="handleMoveMouse($event)"
    @keydown.16="handleSetMode(1)"
    @keydown.alt="handleSetMode(2)"
    @keydown.alt.90="handleSetMode(3)"
    @keyup="handleSetMode(0)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      tabindex="0"
      width="1500"
      height="1000"
      viewbox="0 0 1000 1000"
    >
      <g v-for="(item, index) in elementList" :key="index">
        <Point
          v-if="item.type === 0"
          :data="item"
          :isLock="lockElement.includes(item.mid)"
          @down-point="handleClickElement"
          @up-point="handleClickElement"
        />
        <MLine v-if="item.type === 1" :data="item" />
      </g>
    </svg>
  </div>
</template>

<script>
import Osprey from '../../../dist/osprey.js'
import Point from './elements/Point.vue'
import MLine from './elements/Line.vue'
import bus from '../../utils/event.js'

let osprey = null
let canvas = null
export default {
  props: {
    elementList: {
      type: Array,
      default: () => []
    },
    lockElement: {
      type: Array,
      default: () => []
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  components: {
    Point,
    MLine
  },
  mounted() {
    osprey = new Osprey()
    canvas = document.getElementById('canvas').getBoundingClientRect()
  },
  methods: {
    handleClickElement(mid) {
      bus.emit('lock-element', mid)
    },
    handleClickCanvas(event) {
      const mode = this.mode
      if (!mode) {
        return
      }
      const { left, top } = canvas
      const { clientX, clientY } = event
      if (mode == 1) {
        this.elementList = osprey.createElement({
          x: clientX - left,
          y: clientY - top,
          type: 0
        })
        console.log(this.elementList)
      }
    },
    handleMoveMouse(event) {
      if (this.lockElement.length == 0) {
        return
      }
      // * 如果有选中元素，则移动元素的相关坐标
      const { left, top } = canvas
      const { clientX, clientY } = event
      if (this.mode === 1) {
        this.elementList = osprey.moveElement(
          this.lockElement,
          ({ position, ...it }) => {
            return {
              position: [clientX - left, clientY - top],
              ...it
            }
          }
        )
        return
      }
    },
    handleSetMode(mode) {
      this.$emit('mode-switch', mode)
    }
  }
}
</script>

<style lang="stylus" scoped>
.canvas {
  background-color: rgba(92, 146, 145, 0.5);
  background-image: url('../../assets/texture.png');
  flex: 1;
}
</style>