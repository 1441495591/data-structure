/**
 优先队列：出队顺序和入队顺序无关，而是和优先级有关
 底层使用最大堆来实现，入队和出队操作都是O(logn)级别的
 */
import Maxheap from '堆.js'
class PriorityQueue {
  constructor() {
    this.maxHeap = new Maxheap()
  }

  // 获取队首的元素，也就是优先级最高的元素，就相当于是堆顶的元素
  getFront() {
    return this.maxHeap.finMax()
  }

  // 入队操作
  enqueue(e) {
    this.maxHeap.add(e)
  }

  // 出队操作
  dequeue() {
    return this.maxHeap.extractMax()
  }
}
