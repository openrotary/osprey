const _ = require('lodash')
import Point from './elements/Point'
import Line from './elements/Line'

interface Element {
    type: number
    position: number[]
}

interface OspreyInterface {
    createElement
}

class lineCache {
    cache: any[]
    constructor() {
        this.cache = []
    }
    pushElement(data) {
        this.cache.push(data)
    }
    clearCache() {
        this.cache = []
    }
}

class Osprey implements OspreyInterface {
    elementList: any[]
    constructor(list = []) {
        this.elementList = list.map((it) => {
            if (it.type === 0) {
                return new Point(it)
            }
            if ([1, 2].includes(it.type)) {
                return new Line(it)
            }
        })
    }
    initElement(list) {
        this.elementList = list
        return this.elementList
    }
    createElement({ position, type, isSingle, startMid, endMid }, func) {
        if (type === 0) {
            const point = new Point({ position })
            this.elementList.push(func ? func(point) : point)
        }
        if ([1, 2].includes(type)) {
            const line = new Line({ position, isSingle, type, startMid, endMid })
            this.elementList.unshift(func ? func(line) : line)
        }
        return JSON.parse(JSON.stringify(this.elementList))
    }
    moveElement(moveMid: string[], func): Element[] {
        this.elementList = this.elementList.map((it) => {
            if (moveMid.includes(it.mid)) {
                return func(it)
            }
            return it
        })
        moveMid.forEach(mid => {
            const { position } = this.findElement(mid)
            this.elementList.forEach(it => {
                if (it.startMid === mid) {
                    const [a, b, ...end] = it.position
                    it.position = [...position, ...end]
                }
                if (it.endMid === mid) {
                    const [x, y] = it.position
                    it.position = [x, y, ...position]
                }
            })
        })
        return JSON.parse(JSON.stringify(this.elementList))
    }
    findElement(mid): Element {
        const [data] = this.elementList.filter((it) => it.mid === mid)
        return data
    }
    getList(): Element[] {
        return JSON.parse(JSON.stringify(this.elementList))
    }
    setElement({ mid, ...item }): Element[] {
        const list = this.elementList.map(it => it.mid === mid ? _.merge(it, { mid, ...item }) : it
        )
        this.elementList = list
        return JSON.parse(JSON.stringify(this.elementList))
    }
    removeElement({ mid }) {
        const list = this.elementList.filter(it => {
            return it.mid !== mid && it.startMid !== mid && it.endMid !== mid
        })
        this.elementList = list
        return JSON.parse(JSON.stringify(this.elementList))
    }
}

export default Osprey
