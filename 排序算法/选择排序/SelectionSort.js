// 每次都选择还没处理的元素中的最小的元素

import {
  swap
} from '@/utils/util'

function sort() {
  let arr = JSON.parse(JSON.stringify(this.arr))
  /*
      循环不变量：arr[0,i)是有序的，arr[i,n)是无序的
  */
  for (let i = 0; i < arr.length; i++) {
    //选择arr[i,n)中的最小值的索引
    let minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    arr = swap(arr, i, minIndex)
  }
  this.sortArr = arr
}

//选择排序从后向前循环
//循环不变量：arr[0,i)是无序的，arr[i,n)是有序的
function sortContrary() {
  let arr = JSON.parse(JSON.stringify(this.arr))

  for (let i = arr.length - 1; i >= 0; i--) {
    let maxIndex = i
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    arr = swap(arr, i, maxIndex)
  }
  this.sortArr = arr
}
