## 绘图引擎文档



### 点元素



#### 基础属性

| 属性     | 含义                |
| -------- | ------------------- |
| mid      | 自身id， 唯一字符串 |
| position | [x轴坐标, y轴坐标]  |
|          |                     |





### 线元素

#### 基础属性

| 属性     | 含义                                 |
| -------- | ------------------------------------ |
| mid      | 自身id，唯一字符串                   |
| position | [x1, y1, x2, y2, mx1, my1, mx2, my2] |
| isSingle | 是否双向线                           |
|          |                                      |





### 事件场景

* 当点击事件发生在某个点上方时，该点需要阻止事件冒泡，如果当前是画线模式，则将点存入到缓存中。需要定制一个容量为2的栈。
* 当点击事件发生在