import { uid } from "uid"

export default class Point {
    x: number
    y: number
    mid: string
    constructor({ x, y, mid = null }) {
        this.x = x
        this.y = y
        this.mid = mid || uid()
    }
}