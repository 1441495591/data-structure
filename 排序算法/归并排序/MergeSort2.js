//自底向上的归并排序(从最基础的arr内只有两个元素进行merge)
function mergeSort(arr, l, r) {
  const n = arr.length
  //分组，先1一个一组，2个一组，4个一组...
  for (let sz = 1; sz < n; sz *= 2) {
    //i+sz<n是因为当i不足以让后面的元素按照sz分组进行merge时就结束循环
    for (let i = 0; i + sz < n; i += 2 * sz) {
      //Math.min(i+2*sz-1,n-1)是因为最后一组时，要么是够分完整的merge，要么是不够分，不够分的时候就是数组的最后一位
      //[i,i+sz-1],[i+sz,Math.min(i+2*sz-1,n-1)]
      merge(arr, i, i + sz - 1, Math.min(i + 2 * sz - 1, n - 1))
    }
  }
}


function merge(arr, l, mid, r) {
  let temp = arr.slice(l, r + 1)
  let i = l,
    j = mid + 1
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = temp[j - l]
      j++
    } else if (j > r) {
      arr[k] = temp[i - l]
      i++
    } else if (temp[i - l] > temp[j - l]) {
      arr[k] = temp[j - l]
      j++
    } else {
      arr[k] = temp[i - l]
      i++
    }
  }
}

let arr = [1, 3, 5, 7, 2, 4, 6, 8]
mergeSort(arr)
console.log(arr)


//使用插入排序法优化归并排序发（小规模下，插入排序法优于归并排序法）
function mergeSort2(arr, l, r) {
  const n = arr.length

  //16个为一组，每组进行一次插入排序，这样就相当于每16个元素都是有序的，所以sz可以从16开始
  for (let i = 0; i < n; i += 16) {
    insertionSortBetter(arr, i, Math.min(i + 16 - 1, n - 1))

  }

  for (let sz = 16; sz < n; sz *= 2) {
    //i+sz<n是因为当i不足以让后面的元素按照sz分组进行merge时就结束循环
    for (let i = 0; i + sz < n; i += 2 * sz) {
      //Math.min(i+2*sz-1,n-1)是因为最后一组时，要么是够分完整的merge，要么是不够分，不够分的时候就是数组的最后一位
      //[i,i+sz-1],[i+sz,Math.min(i+2*sz-1,n-1)]
      merge(arr, i, i + sz - 1, Math.min(i + 2 * sz - 1, n - 1))
    }
  }
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
