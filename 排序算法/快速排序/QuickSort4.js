/*
  三路排序算法：将数组分为三部分，<v  =v  >v
  循环不变量arr[l+1，lt]<v, arr[lt+1,i-1]===v, arr[gt,r]>v
*/
function partition(arr, l, r) {
  let lt = l,
    i = l + 1,
    gt = r + 1
  while (i < gt) {
    if (arr[i] < arr[l]) {
      swap(arr, lt + 1, i)
      lt++
      i++
    }
    if (arr[i] === arr[l]) {
      i++
    }
    if (arr[i] > arr[l]) {
      swap(arr, gt - 1, i)
      gt--
    }
  }
  swap(arr, l, lt)
  return {
    lt: lt - 1,
    gt
  }
}
