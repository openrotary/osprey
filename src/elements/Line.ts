import { uid } from 'uid'
export default class Line {
    mid: string
    position: number[]
    isSingle: boolean
    type: 1
    constructor({ mid, position, isSingle }) {
        this.mid = mid || uid()
        this.position = position
        this.type = 1
        this.isSingle = isSingle
    }
}