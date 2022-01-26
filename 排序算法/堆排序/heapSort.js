/**
 堆的原地排序：从小到大
 思路：将数组整理成最大堆，然后第一个元素（最大）与最后一个元素（最小）替换
 然后将替换后的第一个元素进行siftDown操作，使之满足最大堆的性质，这样第一个元素又是最大的了，然后重复进行上述操作
 */
function heapSort(data) {
  for (let i = this.parent(data.length - 1); i >= 0; i--) {
    siftDown(data, i, data.length)
  }

  for (let i = data.length - 1; i >= 0; i--) {
    swap(data, 0, i)
    siftDown(data, 0, i)
  }

}

// 对data[0,n)所形成的的最大堆中，索引为k的元素，执行siftDown
function siftDown(data, k, n) {
  while (this.leftChild(k) < n) {
    let j = this.leftChild(k)
    if (j + 1 < n && data[j] < data[j + 1]) {
      j = j + 1
    }

    if (data[k] < data[j]) {
      swap(data, k, j)
      k = j
    } else {
      break
    }
  }
}
