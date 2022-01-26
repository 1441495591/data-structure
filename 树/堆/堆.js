/**
 二叉堆：是一颗完全二叉树（也就是将元素按照从上至下从左至右的顺序一层一层的存放）
 并且堆中的每个节点都大于等于他的两个孩子节点，这样根节点就是这个二叉堆中最大的元素，称为最大堆
 同理可以得出最小堆（每一个节点的值都小于等于他的两个孩子节点的值）
 我们可以用数组来表示完全二叉树，用索引表示每个节点，见图1、2

 tip：满二叉树是除了叶子节点之外的所有节点都具有左右孩子
 */
class MaxHeap {
  constructor() {
    this.data = []
  }

  size() {
    return this.data.length
  }

  isEmpty() {
    return this.data.length === 0
  }

  // 获取当前元素的父节点的索引
  parent(index) {
    if (index === 0) {
      throw new Error('根节点没有父节点')
    }
    return parseInt((index - 1) / 2)
  }

  // 获取当前元素的左孩子的索引
  leftChild(index) {
    return 2 * index + 1
  }

  // 获取当前元素的右孩子的索引
  rightChild(index) {
    return 2 * index + 2
  }

  // 向堆中添加元素O(logn)
  /**
   先在数组中的最后一位添加上该元素，然后为了保证我们最大堆的特性，也就是父节点大于等于他的两个孩子节点
   所以需要与他的父元素进行对比，如果不满足则交换，然后父元素的父元素也要进行对比，直到对比到满足最大堆的那个节点或者是根节点
   */
  add(e) {
    this.data.push(e)
    this.siftUp(this.data.length - 1)
  }
  // 元素上浮，使传入的索引的元素满足堆的性质
  siftUp(k) {
    while (k > 0 && this.data[this.parent(k)] < this.data[k]) {
      swap(this.data, k, this.parent(k))
      k = this.parent(k)
    }
  }

  //从堆中返回最大元素
  findMax() {
    if (this.data.size() === 0) {
      throw new Error('没有最大元素')
    }
    return this.data[0]
  }

  // 从堆中取出最大元素O(logn)
  /**
   二叉堆的堆顶的元素就是最大元素，直接取出最大元素然后将最后一个元素放在第一个的位置
   然后从第一个元素开始，如果当前元素比他两个孩子中较大的孩子要小，就与较大的孩子替换位置

   tip：这个就可以用来进行排序，将无序的数放入二叉堆中，然后每次取出最大值，这样就是从大到小的排序了，复杂度是O(nlogn)
   */
  extraactMax() {
    const ret = this.findMax()

    // 将最后一位与第一位替换
    swap(this.data, 0, this.data.length - 1)
    // 删除当前的最后一位
    this.data.splice(this.data.length, 1)

    siftDown(0)

    return ret
  }
  // 元素下沉，使传入的索引的元素满足堆的性质
  siftDown(k) {
    // 当当前循环到的索引没有孩子的时候就停止循环
    while (this.leftChild(k) < this.data.size()) {
      let j = this.leftChild(k)
      //j+1就是右孩子的索引，
      // 当右孩子存在并且右孩子大于左孩子时，将右孩子的索引赋值给j
      // j就是当前孩子中较大的那个的索引
      if (j + 1 < this.data.size() && this.data[j] < this.data[j + 1]) {
        j = j + 1
      }
      // 如果当前元素比他两个孩子中较大的孩子要小，就与较大的孩子替换位置,然后将k赋值为j，继续下次循环
      // 否则就结束循环
      if (this.data[k] < this.data[j]) {
        swap(this.data, k, j)
        k = j
      } else {
        break
      }
    }
  }

  // 取出最大元素，并替换成元素e
  // 思路：将e与最大的元素替换，然后进行siftDown即可,复杂度是O(logn)
  replace(e) {
    const ret = this.findMax()

    this.data[0] = e
    this.siftDown(0)

    return ret
  }

  // 将任意数组整理成最大堆的形状，复杂度是O(n)
  // 思路：将数组想象为一个完全二叉树，然后从最后一个非叶子节点开始向前遍历，对每一个遍历的元素进行siftDown即可
  // 如何找出最后一个非叶子节点：最后一个节点的父节点就是最后一个非叶子节点
  heapify(arr) {
    this.data = arr
    for (let i = this.parent(arr.length - 1); i >= 0; i--) {
      siftDown(i)
    }
  }
}
