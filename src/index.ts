import Point from './elements/Point'
import Line from './elements/Line'

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
    this.elementList = list.map((it) => {
      if (it.type === 0) {
        return new Point(it)
      }
    })
  }
  createElement({ position, type, isSingle }, func) {
    if (type === 0) {
      const point = new Point({ position })
      this.elementList.push(func ? func(point) : point)
    }
    if ([1, 2].includes(type)) {
      const line = new Line({ position, isSingle })
      this.elementList.push(func ? func(line) : line)
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
    return JSON.parse(JSON.stringify(this.elementList))
  }
  findElement(mid): object {
    const [data] = this.elementList.filter((it) => it.mid === mid)
    return data
  }
  getList(): Element[] {
    return this.elementList
  }
}

export default Osprey
