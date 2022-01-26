import {
  swap
} from '../../../utils'
/*
  选中第一个元素(也可以随机取)，然后将他进行partition，也就是将这个元素放入正确的位置，
  就是这个元素之前的都是小于他的，这个元素之后的都是大于他的
  也就是这个数组分为三部分，小于当前元素的，当前元素，大于当前元素的
  然后对前半部分的数组继续进行快速排序，后半部分的数组继续进行快速排序
  不断递归
*/
function quickSort(arr, l, r) {
  //最基本情况就是当需要排序的区间不存在或只有一个元素时直接结束
  if (l >= r) {
    return
  }
  //这里同样能使用插入排序法进行优化
  //......

  let k = partition(arr, l, r)
  quickSort(arr, l, k - 1)
  quickSort(arr, k + 1, r)
}

//将一个数组的第一位元素放入正确的位置，就是这个元素之前的都是小于他的，这个元素之后的都是大于他的
//j初始为l，i初始为l+1,选取的第一位元素为v(初始状态的左边界大于有边界就是什么元素都没有)
//循环不变量：arr[l+1,j]<v,arr[j+1,i-1]>=v
//返回已经排好序的那个元素的索引以便于之后的递归
function partition(arr, l, r) {
  let j = l,
    i = l + 1
  for (i; i <= r; i++) {
    if (arr[i] < arr[l]) {
      j++
      swap(arr, i, j)
    }
  }
  swap(arr, l, j)
  return j
}
