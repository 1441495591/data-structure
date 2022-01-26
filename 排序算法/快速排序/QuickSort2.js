import {
  swap
} from '../../../utils'

function quickSort(arr, l, r) {
  //最基本情况就是当需要排序的区间不存在或只有一个元素时直接结束
  if (l >= r) {
    return
  }

  let k = partition(arr, l, r)
  quickSort(arr, l, k - 1)
  quickSort(arr, k + 1, r)
}


/*
   随机取一位，与第一位的数进行交换
   从[l,r]区间内随机取一个索引,思路是先取[0,r-l]区间内的随机数，然后再加上l
   l + [0,r-1] => [l,r]
 */
function partition(arr, l, r) {
  let p = parseInt(Math.random() * (r - l)) + l
  swap(arr, p, l)

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
