class SegmentTree {
  //传入的是需要考察的数组
  constructor(arr) {
    //标书线段树的数组，线段树默认为完全二叉树，没有元素的地方用null表示
    this.tree = Array(4 * arr.length)
    //arr的副本
    this.data = []
    //将数组拷贝到一个副本中，要考虑到引用的问题，可以深拷贝
    arr.forEach(element => {
      this.data.push(element)
    });
  }
  getSize() {
    return this.data.length
  }

  get(index) {
    return this.data[index]
  }

  //返回完全二叉树数组表示中，一个索引所表示的元素的左孩子的节点的索引
  getLeftChild(index) {
    return 2 * index + 1
  }

  //返回完全二叉树数组表示中，一个索引所表示的元素的又孩子的节点的索引
  getRightChild(index) {
    return 2 * index + 2
  }

  // 在treeIndex位置创建表示区间[l,r]的线段树,[l,r]表示源数组的某一个区间，也就是treeIndex表示的原数组的那个区间
  /**
   思路：递归到底的情况是当l===r时，只有一个元素了，所以直接将值存入tree中，
   要知道treeIndex存入的是什么，就得先创建出treeIndex位置的左子树和右子树（发生递归的地方），
   然后根据左孩子和右孩子的值来确定treeIndex应该存什么
   (代码运行的过程就是先创建叶子节点，然后再逐渐向上创建直到根节点)
   */
  buildSegmentTree(treeIndex, l, r) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l]
      return
    }

    const leftChildIndex = this.getLeftChild(treeIndex)
    const rightChildIndex = this.getRightChild(treeIndex)
    const mid = l + parseInt((r - l) / 2)
    buildSegmentTree(leftChildIndex, l, mid)
    buildSegmentTree(rightChildIndex, mid + 1, r)

    // 模拟的是求和操作，可以是任何操作，也可以是用户通过构造器传进来的一个函数的结果（类似于sort排序）
    this.tree[treeIndex] = this.tree[leftChildIndex] + this.tree[rightChildIndex]
  }

  //返回区间[queryL,queryR]的值
  query(queryL, queryR) {
    //边界检查
    if (queryL < 0 || queryL >= this.data.length || queryR < 0 || queryR >= this.data.length || queryL > queryR) {
      throw new Error('边界异常')
    }
    this.queryD(0, 0, this.data.length - 1, queryL, queryR)
  }

  //递归函数
  //以treeIndex为根的线段树表示[l,r]的范围里，搜索区间[queryL,queryR]的值
  //l和r是treeIndex位置的节点所表示的源数组的区间
  queryD(treeIndex, l, r, queryL, queryR) {
    if (l === queryL && r === queryR) {
      return this.tree[treeIndex]
    }

    /**
     左右边界不匹配的情况
     1.需要查询的区间全部在左孩子
     2.需要查询的区间全部在右孩子
     3.需要查询的区间一部分在左孩子一部分在右孩子
     */
    const leftChildIndex = this.getLeftChild(treeIndex)
    const rightChildIndex = this.getRightChild(treeIndex)
    const mid = l + parseInt((r - l) / 2)
    if (queryR <= mid) {
      return this.queryD(leftChildIndex, l, mid, queryL, queryR)
    } else if (queryL >= mid + 1) {
      return this.queryD(rightChildIndex, mid + 1, r, queryL, queryR)
    } else {
      const leftResult = this.queryD(leftChildIndex, l, mid, queryL, mid)
      const rightResult = this.queryD(rightChildIndex, mid + 1, r, mid + 1, queryR)
      //模拟的是求和操作，可以是任何操作，也可以是用户通过构造器传进来的一个函数的结果（类似于sort排序）
      return leftResult + rightResult
    }
  }

  //更新数组index位置的元素为e
  set(index, e) {
    data[index] = e
    setD(0, 0, data.length - 1, index, e)
  }

  //在以treeIndex为根的线段树中更新index位置的值为e
  setD(treeIndex, l, r, index, e) {
    /**
     递归到底的情况就是当l===r时，表示已经递归到index的位置了
     */
    if (l === r) {
      this.tree[treeIndex] = e
      return
    }

    /**
     没有递归到底时，判断index在左子树还是右子树，然后不断递归
     */
    const leftChildIndex = this.getLeftChild(treeIndex)
    const rightChildIndex = this.getRightChild(treeIndex)
    const mid = l + parseInt((r - l) / 2)
    if (index <= mid) {
      this.setD(leftChildIndex, l, mid, index, e)
    } else {
      this.setD(rightChildIndex, mid + 1, r, index, e)
    }

    //改变了左子树或者右子树idnex的值的时候，他本身的值也得重新定义了
    this.tree[treeIndex] = this.tree[leftChildIndex] + this.tree[rightChildIndex]
  }
}
