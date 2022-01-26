class RBTree {
  static RED = true
  static BLACK = false

  constructor() {
    //根节点
    this.root = null
    //树中包含的节点数量
    this.size = 0
  }


  // 返回当前节点是黑色还是红色
  isRed(node) {
    if (node === null) {
      return BLACK
    }
    return node.color
  }

  add(node, e) {
    this.root = addD(node, e)
    // 最后的根节点一定是黑色的
    this.root.color = BLACK
  }

  // 向以node为根的二分搜索树中插入元素e,并返回这个根
  addD(node, e) {
    if (node === null) {
      this.size++
      // 默认添加一个红色元素
      return new Node(e)
    }

    if (node.e < e) {
      node.left = addD(node.left, e)
    } else if (node.e > e) {
      node.right = addD(node.right, e)
    }

    // 红黑树性质的维护
    if (!this.isRed(node.left) && this.isRed(node.right)) {
      // 右孩子是红色的,左孩子不是红色的则进行左旋转
      node = this.leftRotate(node)
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      // 左孩子时红色的,左孩子的左孩子也是红色的则进行右旋转
      node = this.rightRotate(node)
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    return node
  }

  // 左旋转以node为根的树,并返回新的根
  leftRotate(node) {
    const x = node.right
    node.right = x.left
    x.left = node
    // 新的根节点保持和之前根节点一样的颜色
    x.color = node.color
    // 因为现在node是在2-3树中表示与x融和的节点，所以他的颜色应该是红色的
    node.color = RED
    return x
  }

  // 右旋转以node为根的树,并返回新的根
  rightRotate(node) {
    const x = node.left
    node.left = x.rihgt
    x.right = node
    // 新的根节点保持和之前根节点一样的颜色
    x.color = node.color
    // 因为现在node是在2-3树中表示与x融和的节点，所以他的颜色应该是红色的
    node.color = RED
    return node
  }

  // 颜色反转
  flipColors(node) {
    node.color = RED
    node.left.color = BLACK
    node.right.color = BLACK
  }
}


//二分搜索树中的节点
class Node {
  static RED = true
  static BLACK = false

  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    // 默认是红色，因为给2-3树添加节点时总会与最后的叶子节点进行融和，所以肯定是红色的
    this.color = RED
  }
}
