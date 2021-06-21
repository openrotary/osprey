import Point from './elements/Point'
// import Line from './elements/Line'

interface Element {
    type: string
}

interface OspreyInterface {
    createElement
}

class Osprey implements OspreyInterface {
    elementList: any[]
    constructor(list = []) {
        this.elementList = list.map(it => {
            if (it.type === 'point') {
                return new Point(it)
            }
        })
    }
    createElement({ x, y, type }, func) {
        if (type === 'point') {
            const point = new Point({ x, y })
            this.elementList.push(func ? func(point) : point)
        }
        return this.elementList
    }
    moveElement() { }
    getList(): Element[] {
        return this.elementList
    }

}

export default Osprey