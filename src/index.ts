import Point from './elements/Point'
// import Line from './elements/Line'

interface Element {
    type: string
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
        this.elementList = list.map(it => {
            if (it.type === 0) {
                return new Point(it)
            }
        })
    }
    createElement({ x, y, type }, func) {
        if (type === 0) {
            const point = new Point({ position: [x, y] })
            this.elementList.push(func ? func(point) : point)
        }
        return JSON.parse(JSON.stringify(this.elementList))
    }
    moveElement(moveMid: string[], func): Element[] {
        this.elementList = this.elementList.map(it => {
            if (moveMid.includes(it.mid)) {
                return func(it)
            }
            return it
        })
        return JSON.parse(JSON.stringify(this.elementList))
    }
    getList(): Element[] {
        return this.elementList
    }

}

export default Osprey