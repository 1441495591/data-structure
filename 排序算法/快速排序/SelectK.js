/**
 selectK问题
 查找数组中第K小的元素（代码中默认K从0开始，与索引对应）
 */
function selectK(arr, l, r, k) {

}

function partition(arr, l, r) {
  let i = l + 1,
    j = r
  while (true) {
    while (i <= j && arr[i] < arr[l]) {
      i++
    }
    while (j >= i && arr[j] > arr[i]) {
      j--
    }
    if (i >= j) {
      break
    }
    swap(arr, i, j)
    i++
    j--
  }
  swap(arr, l, j)
  return j
}
