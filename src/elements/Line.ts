import { uid } from 'uid'
export default class Line {
  mid: string
  position: number[]
  isSingle: boolean
  type: number
  constructor({ mid = null, type = 1, position, isSingle = true }) {
    this.mid = mid || uid()
    this.position = position
    this.type = type
    this.isSingle = isSingle
  }
}
