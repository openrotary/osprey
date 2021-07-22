import { uid } from '../utils'
export default class Line {
  mid: string
  position: number[]
  isSingle: boolean
  type: number
  startMid: string
  endMid: string
  constructor({ mid = null, type = 1, position, isSingle = true, startMid, endMid }) {
    this.mid = mid || uid()
    this.position = position
    this.type = type
    this.isSingle = isSingle
    this.startMid = startMid
    this.endMid = endMid
  }
}
