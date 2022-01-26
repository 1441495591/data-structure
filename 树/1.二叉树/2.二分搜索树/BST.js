/**
 二分搜索数也是一种二叉树
 他的每个节点，大于他的左孩子，小于他的右孩子，具有这种性质可以在查找数据的时候变得非常快
 所以二分搜索树的节点必须是可比较的，二分搜索树的节点可以存key-value的形式，只要key是可比较的即可

 二分搜索树实现的集合是有序的，链表实现的集合是无序的，
 二分搜索树实现的集合的时间复杂度是O(logn),链表实现的集合的时间复杂度是O(n)
 */
class BST {
  constructor() {
    //根节点
    this.root = null
    //树中包含的节点数量
    this.size = 0
  }

  size() {
    return this.size
  }
  isEmpty() {
    return this.size === 0
  }

  // 向二分搜索树中添加一个新的元素
  add(e) {
    if (this.root === null) {
      this.root = new Node(e)
      this.size++
    } else {
      addD(this.root, e)
    }
  }

  // 查看二分搜索树中是否包含元素e
  contains(e) {
    return containsD(this.root, e)
  }

  // 二分搜索树的前序遍历
  preOrder() {
    preOrderD(this.root)
  }

  // 二分搜索树的中序遍历
  inOrder() {
    inOrderD(this.root)
  }

  // 二分搜索树的后序遍历
  postOrder() {
    postOrderD(this.root)
  }

  // 前序遍历的非递归写法
  // 每次遍历到一个节点的时候就将这个节点的左节点和右节点放入栈中
  preOrderNR() {
    const stack = new stack()
    stack.push(this.root)
    while (!stack.isEmpty()) {
      const node = stack.pop()
      console.log(node.e)
      if (node.right) {
        stack.push(node.right)
      }
      if (node.left) {
        stack.push(node.left)
      }
    }
  }

  //层序遍历（广度优先遍历）
  // 先将根节点放入队列中，然后循环，每次从队列中取出元素，然后将这个元素的左右孩子再放入队列中
  // 意义：可以更快找到问题的解，不像深度遍历每次都要查找到最深处
  levelOrder(node) {
    const arrayQueue = new ArrayQueue()
    arrayQueue.enqueue(node)
    while (!arrayQueue.isEmpty()) {
      // 取出元素
      const node = arrayQueue.dequeue()
      console.log(node.e)

      // 放入元素
      if (node.left) {
        arrayQueue.enqueue(node.left)
      }
      if (node.right) {
        arrayQueue.enqueue(node.right)
      }
    }
  }

  // 查询二分搜索树中最小值（就是树中最左边的值）
  minimum() {
    if (this.size === 0) {
      throw new Error('树是空')
    }
    return minimumD(this.root).e
  }

  // 查询二分搜索树中最大值（就是树中最右边的值）
  maximum() {
    if (this.size === 0) {
      throw new Error('树是空')
    }
    return maximumD(this.root).e
  }

  // 删除二分搜索树中最小的元素，并将它返回
  removeMin() {
    const ret = this.minimum()
    this.root = removeMinD(this.root)
    return ret
  }

  // 删除二分搜索树中的任意元素
  remove(e) {
    this.root = removeD(this.root, e)
  }
}
// 向以node为根的二分搜索树中插入元素e
function addD(node, e) {
  if (node.e === e) {
    // 元素相同时证明不需要加入了，直接结束
    return
  } else if (node.e > e && node.left === null) {
    node.left = new Node(e)
    this.size++
  } else if (node.e < e && node.right === null) {
    node.right = new Node(e)
    this.size++
  }

  if (node.e > e) {
    addD(node.left, e)
  } else {
    addD(node.right, e)
  }
}

// 查看以node为根的二分搜索树中是否包含元素e
function containsD(node, e) {
  if (node === null) {
    return falase
  }

  if (node.e === e) {
    return true
  } else if (node.e < e) {
    return containsD(node.left, e)
  } else {
    return containsD(node.right, e)
  }
}

/**
 前中后序遍历都是深度优先遍历
 */
// 前序遍历以node为根的二分搜索树
function preOrderD(node) {
  if (node === null) {
    return
  }

  console.log(node.e)
  preOrderD(node.left)
  preOrderD(node.right)
}

// 中序遍历以node为根的二分搜索树
// 中序遍历是按照从小到大顺序遍历的(因为二分搜索树左边是小于根节点的，然后右边是大于根节点的，就是一个有序的结构)，
// 这是重要的性质
function inOrderD(node) {
  if (node === null) {
    return
  }

  inOrderD(node.left)
  console.log(node.e)
  inOrderD(node.right)
}

// 后序遍历以node为根的二分搜索树
// 使用场景，需要先处理完所有孩子节点，再处理根节点的情况(例如释放内存)
function postOrderD(node) {
  if (node === null) {
    return
  }

  postOrderD(node.left)
  postOrderD(node.right)
  console.log(node.e)
}

// 后序遍历求二叉树的高度
function postOrderGetHeight(node) {
  if (node === null) {
    return 0
  }

  const h1 = postOrderGetHeight(node.left)
  const h2 = postOrderGetHeight(node.right)
  return Math.max(h1, h2) + 1
}



// 返回以node为根的二分搜索树中最小值所在的节点
function minimumD(node) {
  if (!node.left) {
    return node
  }
  return minimumD(node.left)
}

// 返回以node为根的二分搜索树中最大值所在的节点
function maximumD(node) {
  if (!node.right) {
    return node
  }
  return maximumD(node.right)
}

// 删除以node为根的二分搜索树中的最小节点并返回删除节点后新的二分搜索树的根
function removeMinD(node) {
  // 要将要删除的最小元素的右节点与之前节点的左节点相连
  if (!node.left) {
    const rightNode = node.right
    node.right = null
    this.size--
    return rightNode
  }
  node.left = removeMinD(node.left)
  return node
}

// 删除以node为根的二分搜索树中的值为e的节点并返回删除节点后新的二分搜索树的根
function removeD(node, e) {
  if (!node) {
    return null
  }

  if (e < node.e) {
    node.left = removeD(node.left, e)
    return node
  } else if (e > node.e) {
    node.right = removeD(node.right, e)
    return node
  } else {
    // 找到了与e相同的节点
    if (!node.left) {
      const rightNode = node.right
      node.right = null
      this.size--
      return rightNode
    } else if (!node.right) {
      const leftNode = node.left
      node.left = null
      this.size--
      return leftNode
    } else {
      // 左节点和右节点都存在
      /**
       思路：找到比待删除节点node大的最小的节点successor
            successor的左孩子就是待删除节点的左孩子
            successor的右孩子就是以node.right为根节点的删除了successor的树
       */
      const successor = this.minimumD(node.right)
      successor.right = this.removeMinD(node.right)
      successor.left = node.left
      // 置为null是为了清除内存
      node.left = node.right = null
      return successor
    }
  }
}

//二分搜索树中的节点
class Node {
  constructor(e) {
    this.e = e
    this.left = null
    this.right = null
  }
}
