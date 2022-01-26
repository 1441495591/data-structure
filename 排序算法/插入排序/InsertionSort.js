/*
  插入排序法 循环数组，将每次循环到的那个元素与之前排好序的部分比较，
  找出第一个比当前循环到的元素小的，然后插入到这个比他小的元素的后一位
  插入排序法的特点，一旦找到了比当前循环的元素小的值则可以停止当前循环，
  对于部分数据有序的情况，插入排序法效率高于O(n2)
  所以对于完全有序的数组，插入排序法的时间复杂度是O(n)
*/

import {
  swap
} from '@/utils/util'

function insertionSort() {
  /*
    循环不变量:arr[0,i)有序，arr[i,n)无序
  */
  let arr = JSON.parse(JSON.stringify(this.arr));
  let sortArr = [];
  for (let i = 0; i < arr.length; i++) {
    //因为要和前面的一个元素比较，要保证前面一位有元素，所以j>0
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        sortArr = swap(arr, j - 1, j);
      } else {
        //arr[0,i)是有序的，所以当arr[j-1]<arr[j]时，则已经是正确的位置了，直接退出这次循环
        break;
      }
    }
  }
  this.sortArr = sortArr;
}

//优化版本(将当前需要循环比较的元素拎出来，与他之前的元素进行比较，每次比较不进行替换而是直接赋值给后一位，
//直到找到了第一个比他小的元素，将当前需要循环比较的元素放到他的后一位)将替换操作变为赋值操作了
function insertionSortBetter() {
  let arr = JSON.parse(JSON.stringify(this.arr));
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i],
      j;
    for (j = i; j > 0; j--) {
      if (arr[j - 1] > item) {
        arr[j] = arr[j - 1];
      } else {
        break;
      }
    }
    arr[j] = item;
  }
  this.sortArr = arr;
}

//换一个角度实现
//循环不变量：arr[0,i)是无序的，arr[i,n)是有序的
function insertionSortContrary() {
  let arr = JSON.parse(JSON.stringify(this.arr));
  for (let i = arr.length - 1; i >= 0; i--) {
    let item = arr[i],
      j;
    for (j = i; j < arr.length - 1 && item > arr[j + 1]; j++) {
      arr[j] = arr[j + 1];
    }
    arr[j] = item;
  }
  this.sortArr = arr;
}
