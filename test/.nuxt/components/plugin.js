import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  MyElement: () => import('../../components/MyElement/index.vue' /* webpackChunkName: "components/my-element" */).then(c => wrapFunctional(c.default || c)),
  MyElementElementsLine: () => import('../../components/MyElement/elements/Line.vue' /* webpackChunkName: "components/my-element-elements-line" */).then(c => wrapFunctional(c.default || c)),
  MyElementElementsPoint: () => import('../../components/MyElement/elements/Point.vue' /* webpackChunkName: "components/my-element-elements-point" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
