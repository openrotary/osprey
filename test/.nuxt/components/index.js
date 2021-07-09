import { wrapFunctional } from './utils'

export { default as MyElement } from '../../components/MyElement/index.vue'
export { default as MyElementElementsLine } from '../../components/MyElement/elements/Line.vue'
export { default as MyElementElementsPoint } from '../../components/MyElement/elements/Point.vue'

export const LazyMyElement = import('../../components/MyElement/index.vue' /* webpackChunkName: "components/my-element" */).then(c => wrapFunctional(c.default || c))
export const LazyMyElementElementsLine = import('../../components/MyElement/elements/Line.vue' /* webpackChunkName: "components/my-element-elements-line" */).then(c => wrapFunctional(c.default || c))
export const LazyMyElementElementsPoint = import('../../components/MyElement/elements/Point.vue' /* webpackChunkName: "components/my-element-elements-point" */).then(c => wrapFunctional(c.default || c))
