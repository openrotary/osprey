<template>
  <div
    id="canvas"
    class="canvas"
    @mouseup.stop="handleClickCanvas($event)"
    @mousemove="handleMoveMouse($event)"
    @keydown.16="handleSetMode(1)"
    @keydown.alt="handleSetMode(2)"
    @keydown.90="handleSetMode(3)"
    @keyup="handleSetMode(0)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      tabindex="0"
      width="1000"
      height="1000"
      viewbox="0 0 1000 1000"
    >
      <MLine v-if="showHelpLine" :data="activeLine" color="#4269e1" />
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

let osprey = null
let canvas = null
const singleHash = new Map().set(2, true).set(3, false)
const typeHash = new Map().set(2, 1).set(3, 2)
export default {
  props: {
    mode: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    elementList: [],
    lockElement: [],
    activeLine: null
  }),
  components: {
    Point,
    MLine
  },
  computed: {
    showHelpLine() {
      return [2, 3].includes(this.mode) && !!this.activeLine
    }
  },
  mounted() {
    osprey = new Osprey()
    canvas = document.getElementById('canvas').getBoundingClientRect()
  },
  methods: {
    initElement(list) {
      // * 初始化 elementList
      this.elementList = list
    },
    handleClickElement(mid) {
      if (mid == null) {
        return
      }
      if ([2, 3].includes(this.mode)) {
        const data = osprey.findElement(mid)
        const [xc, yc] = data.position
        if (this.lockElement.length) {
          // * 如果lockElement有值，说明已经指定了起点，则创建新的线条
          const [lockElement] = this.lockElement
          const [startX, startY] = lockElement.position
          this.elementList = osprey.createElement({
            position: [startX, startY, xc, yc],
            isSingle: singleHash.get(this.mode),
            type: typeHash.get(this.mode)
          })
        }
        // * 更新新线段的起点
        this.lockElement = [data]
        this.activeLine = {
          mid: 'line2-3',
          isSingle: singleHash.get(this.mode),
          position: [xc, yc, xc, yc]
        }
      }
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
          position: [clientX - left, clientY - top],
          type: 0
        })
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
      if ([2, 3].includes(this.mode)) {
        const { position, ...item } = this.activeLine
        const [a, b, x, y] = position
        this.activeLine = {
          position: [a, b, clientX - left, clientY - top],
          ...item
        }
        return
      }
    },
    handleSetMode(mode) {
      if (mode === this.mode) {
        return
      }
      this.lockElement = []
      this.activeLine = null
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