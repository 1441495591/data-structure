/**
 二分搜索树的add方法的更简洁版本
 可以先写链表的添加元素的递归写法，与这个思路很相似
 */
function add(e) {
  this.root = addD(this.root, e)
}

// 向以node为根的二分搜索树中插入元素e,并返回这个根
function addD(node, e) {
  if (node === null) {
    this.size++
    return new Node(e)
  }

  if (node.e < e) {
    node.left = addD(node.left, e)
  } else if (node.e > e) {
    node.right = addD(node.right, e)
  }

  return node
}

// 链表的添加元素的递归写法
function linkAddD(node, e) {
  if (node === null) {
    return new Node(e)
  }

  node.next = linkAddD(node.next, e)
  return node
}
