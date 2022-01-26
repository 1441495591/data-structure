/**
 思路：每次比较相邻两个元素的大小，这样每轮之后，最大的元素就被放到数组最后的位置了,每次循环都会让数组更加有序
 i从0开始
 第i轮开始时,arr[n-i,n)是排好序的
 第i轮，在arr[n-i-1]的位置放上合适的元素
 */
function bubbleSort(arr) {
  //控制循环的次数
  //当有arr.length个元素的时候，只需要进行arr.length-1轮循环即可
  //因为到最后只剩下一个元素了，不需要在进行比较了
  //i也可以看做是当前有i个元素已经被排好序了
  for (let i = 0; i <= arr.length - 2; i++) {
    //arr[n-i,n)是排好序的
    //需要在arr[n-i-1]的位置放上合适元素
    //这个循环中是不停的比较j和j+1的大小，所以只需要j+1<=已经排好序的元素的前一位即可
    for (let j = 0; j + 1 <= arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}

/**
 优化当对完全有序的数组进行排序的时候
 思路：当一轮循环中没有任何元素需要swap操作时，表示剩下的元素都是有序的了，就不需要执行任何操作了
 */
function bubbleSort(arr) {
  for (let i = 0; i <= arr.length - 2; i++) {
    let isSwap = false
    for (let j = 0; j + 1 <= arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        isSwap = true
        swap(arr, j, j + 1)
      }
    }
    if (isSwap) {
      break
    }
  }
}

/**
 更进一步优化，当内层循环执行到某次时后面都不在swap了，证明这次之后的所有值都是有序的了
 */
function bubbleSort(arr) {
  for (let i = 0; i <= arr.lenght - 2; i++) {
    let lastSwapIndex = 0
    for (let j = 0; j + 1 <= arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        //记录最后一个替换的位置
        lastSwapIndex = j + 1
      }
    }
    //i就是当前数组中有多少个元素已经是有序的了
    i = arr.length - lastSwapIndex
  }
}

/**
 换一种方式实现冒泡排序：
 从后向前循环，然后比较元素(j-1,j)进行替换，这样每次一大轮循环完了就会将最小的元素放在最前面
 循环不变量：
 第i轮开始：arr[0,i)是有序的
 第i轮，在arr[i]的位置放上合适的元素
 */
function bubbleSort2(arr) {
  for (let i = 0; i <= arr.length - 2; i++) {
    //外层循环中的时候，i的位置的元素还未排好序
    for (let j = arr.length - 1; j - 1 >= i; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j)
      }
    }
  }
}
