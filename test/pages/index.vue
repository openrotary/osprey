<template>
  <div class="container">
    <ul class="sidebar">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleClickMode(item.mode)"
        :class="[{ active: item.active }]"
        :style="{
          'background-image': `url(${item.icon})`
        }"
      ></li>
      <li>{{ mode }}</li>
    </ul>
    <MyElement
      :elementList="elementList"
      :lockElement="lockElement"
      :mode.sync="mode"
      @mode-switch="handleClickMode"
    />
  </div>
</template>

<script>
import pointIcon from '../assets/pointIcon.svg'
import pathIcon from '../assets/pathIcon.svg'
import dPathIcon from '../assets/dPathIcon.svg'
import resetIcon from '../assets/resetIcon.svg'
import bus from '../utils/event.js'

let osprey = null
let canvas = null

export default {
  data: () => ({
    mode: 0,
    menuList: [
      { name: '点', mode: 1, active: false, icon: pointIcon },
      { name: '线', mode: 2, active: false, icon: pathIcon },
      { name: '双', mode: 3, active: false, icon: dPathIcon },
      { name: '重置', mode: 0, active: true, icon: resetIcon }
    ],
    elementList: [],
    lockElement: []
  }),
  mounted() {
    bus.on('lock-element', (mid) => {
      if (!mid) {
        this.lockElement = []
        return
      }
      if (this.mode === 1) {
        this.lockElement.push(mid)
        return
      }
      if (this.mode === 2) {
        this.lockElement = [mid]
        return
      }
    })
  },
  methods: {
    handleClickMode(newMode) {
      this.mode = newMode || 0
      const list = this.menuList.map(({ mode, active, ...it }) => ({
        active: mode === newMode,
        mode,
        ...it
      }))
      this.menuList = list
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  box-sizing: border-box;

  .sidebar {
    height: 100%;
    width: 60px;
    padding: 0;
    flex-shrink: 0;

    li {
      width: 100%;
      height: 60px;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid rgba(92, 146, 145, 1);
      background-repeat: no-repeat;
      background-size: 40px;
      background-position: center center;

      &.active {
        background-color: rgba(92, 146, 145, 1);
        color: #fff;
      }
    }
  }
}
</style>
