/**
 * AVL树是对二分搜索树的一种改进，防止二分搜索树退化成链表的情况
 AVL树是一种平衡二叉树，
 需要维护每个节点的高度和平衡因子
 增删改查都是O(logn)级别的
 */
class AVLTree {
  constructor() {
    //根节点
    this.root = null
    //树中包含的节点数量
    this.size = 0
  }

  // 向以node为根的二分搜索树中插入元素e,并返回这个根
  addD(node, e) {
    if (node === null) {
      this.size++
      return new Node(e)
    }

    if (node.e < e) {
      node.left = addD(node.left, e)
    } else if (node.e > e) {
      node.right = addD(node.right, e)
    }


    // 这时候的node已经是处理完逻辑从下往上回溯的node了
    // 更新height,到这node的高度都有可能发生变化了，所以更新下高度值
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right))
    // 计算平衡因子
    const balanceFactor = getBalanceFactor(node)
    if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
      // balanceFactor > 1，平衡因子大于1表示左子树比右子树的高度至少高2，
      // getBalanceFactor(node.left) >= 0表示当前节点的左子树的左子树的高度比当前节点的左子树的右子树的高度要高或者相等，
      // 所以添加元素的位置是当前不平衡节点的左子树的左子树，也就是LL
      return rightRotate(node)
    }
    if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
      // balanceFactor < -1表示当前节点的右子树的高度比左子树的高度至少高2
      // getBalanceFactor(node.right) <= 0表示当前节点的右子树的右子树的高度比当前节点的右子树的左子树的高度要高或者相等
      // 所以添加元素的位置是当前不平衡节点的右子树的右子树，也就是RR
      return leftRotate(node)
    }
    if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
      // 当前节点左子树高度比右子树高度高至少2,并且他的左子树的左子树的高度比他的左子树的右子树的高度要小，
      // 所以添加的元素的位置是当前节点的左子树的右子树，也就是LR
      node.left = leftRotate(node.left)
      return rightRotate(node)
    }
    if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
      // 当前节点的右子树的高度比左子树的盖度至少高2，并且他的右子树的左子树的高度比他右子树的右子树的高度要大
      // 所以添加的元素的位置是当前节点的右子树的右子树，也就是RL
      node.right = rightRotate(node.right)
      return leftRotate(node)
    }

    return node
  }


  // 返回这个节点的高度
  getHeight(node) {
    if (node === null) {
      return 0
    }
    return node.height
  }

  // 返回这个节点的平衡因子
  getBalanceFactor(node) {
    if (node === null) {
      return 0
    }
    return getHeight(node.left) - getHeight(node.right)
  }

  /**
   判断当前的二叉树是不是二分搜索树
   思路：对这颗二叉树进行中序遍历，如果是二分搜索树，那么遍历出来的结果应该是从小到大的
   */
  isBST() {
    const arr = []
    inOrder(this.root, arr)
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        return false
      }
    }
    return true
  }

  /**
    判断当前的二叉树是不是平衡二叉树
   */
  isBalanced() {
    return isBalancedD(this.root)
  }

  isBalancedD(node) {
    if (node === null) {
      return true
    }

    let balanceFactor = getBalanceFactor(node)
    if (Math.abs(balanceFactor) > 1) {
      return false
    } else {
      return isBalancedD(node.left) && isBalancedD(node.right)
    }
  }

  inOrder(node, arr) {
    if (node === null) {
      return
    }
    inOrder(node.left, arr)
    arr.push(node.e)
    inOrder(node.right, arr)
  }

  // 右旋转,返回旋转后的根节点
  rightRotate(y) {
    const x = y.left
    const T3 = x.right
    x.right = y
    y.left = T3

    // 更新height值，只有x、y的高度改变了
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1
    y.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1

    return x
  }

  //左旋转，返回旋转后的根节点
  leftRotate(y) {
    const x = y.right
    const T3 = x.left
    x.left = y
    y.right = T3

    // 更新height
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1
    y.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1

    return x
  }

  // 删除以node为根的二分搜索树中的值为e的节点并返回删除节点后新的二分搜索树的根
  removeD(node, e) {
    if (!node) {
      return null
    }

    let retNode = null
    if (e < node.e) {
      node.left = removeD(node.left, e)
      retNode = node
    } else if (e > node.e) {
      node.right = removeD(node.right, e)
      retNode = node
    } else {
      // 找到了与e相同的节点
      if (!node.left) {
        const rightNode = node.right
        node.right = null
        this.size--
        retNode = rightNode
      } else if (!node.right) {
        const leftNode = node.left
        node.left = null
        this.size--
        retNode = leftNode
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
        node.left = node.right = null
        retNode = successor
      }
    }

    // retNode就是执行完删除操作之后的根节点
    // 这时候删除retNode就需要判断他的平衡因子是不是大于1了，和添加操作一样
    // 更新height,到这retNode的高度都有可能发生变化了，所以更新下高度值
    retNode.height = 1 + Math.max(getHeight(retNode.left), getHeight(retNode.right))
    // 计算平衡因子
    const balanceFactor = getBalanceFactor(retNode)
    if (balanceFactor > 1 && getBalanceFactor(retNode.left) >= 0) {
      // balanceFactor > 1，平衡因子大于1表示左子树比右子树的高度至少高2，
      // getBalanceFactor(retNode.left) >= 0表示当前节点的左子树的左子树的高度比当前节点的左子树的右子树的高度要高或者相等，
      // 所以添加元素的位置是当前不平衡节点的左子树的左子树，也就是LL
      return rightRotate(retNode)
    }
    if (balanceFactor < -1 && getBalanceFactor(retNode.right) <= 0) {
      // balanceFactor < -1表示当前节点的右子树的高度比左子树的高度至少高2
      // getBalanceFactor(retNode.right) <= 0表示当前节点的右子树的右子树的高度比当前节点的右子树的左子树的高度要高或者相等
      // 所以添加元素的位置是当前不平衡节点的右子树的右子树，也就是RR
      return leftRotate(retNode)
    }
    if (balanceFactor > 1 && getBalanceFactor(retNode.left) < 0) {
      // 当前节点左子树高度比右子树高度高至少2,并且他的左子树的左子树的高度比他的左子树的右子树的高度要小，
      // 所以添加的元素的位置是当前节点的左子树的右子树，也就是LR
      retNode.left = leftRotate(retNode.left)
      return rightRotate(retNode)
    }
    if (balanceFactor < -1 && getBalanceFactor(retNode.right) > 0) {
      // 当前节点的右子树的高度比左子树的盖度至少高2，并且他的右子树的左子树的高度比他右子树的右子树的高度要大
      // 所以添加的元素的位置是当前节点的右子树的右子树，也就是RR
      retNode.right = rightRotate(retNode.right)
      return leftRotate(retNode)
    }
    return retNode
  }
}


//AVL树中的节点
// 与二分搜索树一样，当新添加一个节点的时候，这个节点会被添加到叶子节点
class Node {
  constructor(e) {
    this.e = e
    this.left = null
    this.right = null
    // 节点的高度
    this.height = 1
  }
}
