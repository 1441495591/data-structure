/**
  归并排序法：
  思路：递归的将数组平分为两部分然后每一部分进行排序
  最后将两部分已经排序好的数组整合为一个已经排序好的数组
  复杂度是O(nlogn)
 */
function mergeSort(arr, l, r) {
  //最基本情况:数组中没有或只有一个元素
  if (l >= r) {
    return
  }
  //转化为更小的问题
  //l和r不一定是从0开始，所以不能直接(r-l)/2
  let mid = parseInt(l + (r - l) / 2)
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)
  merge(arr, l, mid, r)

  return arr
}

/**
 合并两个有序的区间arr[l,mid],arr[mid+1,r]
 思路：因为两部分都排好序了，所以循环整个数组，然后每次两部分，取出较小的那个放到当前循环到了索引的位置
 (l不一定为0，有个偏移量l的存在，第二部分数组的l就不是0)
 */
function merge(arr, l, mid, r) {
  let i = l,
    j = mid + 1,
    //拷贝一个l到r的新数组用于取值
    temp = arr.slice(l, r + 1)
  //因为要给arr重新赋值，所以从l循环到r
  //temp是拷贝的，索引从0开始，而arr不是从0开始，有个l的偏移量
  //循环的次数就是将数组内所有元素都遍历一遍
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = temp[j - l]
      j++
    } else if (j > r) {
      arr[k] = temp[i - l]
      i++
    } else if (temp[i - l] >= temp[j - l]) {
      arr[k] = temp[j - l]
      j++
    } else if (temp[j - l] >= temp[i - l]) {
      arr[k] = temp[i - l]
      i++
    }
  }
  return arr
}

//测试merge函数
let arr = [1, 3, 5, 7, 2, 4, 6, 8]
merge(arr, 0, 3, 7)


let arr1 = [9, 2, 19, 3, 49, 41, 15, 75]
console.log(mergeSort(arr, 0, arr.length - 1))





//mergeSort的优化
function mergeSort(arr, l, r) {
  if (l >= r) {
    return
  }

  //当数组元素比较少的时候，插入排序的速度是优于归并排序的
  if (r - l <= 15) {
    insertionSortBetter(arr, l, r)
    return
  }

  let mid = parseInt(l + (r - l) / 2)
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)
  //如果左边的有序数组的最后一个值已经比右边数组的第一个值小了，则不需要排序了
  //当arr是完全有序的数组，mergeSort的复杂度变为O(n)
  if (arr[mid] > arr[mid + 1]) {
    merge(arr, l, mid, r)
  }
  return arr
}

//插入排序(不是从索引0开始排序了，是从l到r的区间进行排序)
function insertionSortBetter(arr, l, r) {
  for (let i = l; i <= r; i++) {
    let item = arr[i],
      j;
    for (j = i; j - 1 >= l; j--) {
      if (arr[j - 1] > item) {
        arr[j] = arr[j - 1]
      } else {
        break;
      }
    }
    arr[j] = item
  }
}
