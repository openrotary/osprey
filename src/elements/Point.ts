import { uid } from "../utils"

export default class Point {
    position: number[]
    mid: string
    type: 0
    constructor({ position, mid = null }) {
        this.position = position
        this.type = 0
        this.mid = mid || uid()
    }
}