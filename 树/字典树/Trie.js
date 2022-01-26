/**
 Trie的本质是一个多叉树
 Trie只用来处理字符串（例如：通讯录）
 Trie查询的时间复杂度与数量无关，而是与查询的字符串的长度有关
 */
class Trie {
  constructor() {
    // 这棵树的根节点
    this.root = new Node()
    // Trie中存储的单词的数量
    this.size = 0
  }

  /**
   向Trie中添加一个单词
   单词的每个字母会被当做一个节点
   */
  //非递归写法
  add(word) {
    let cur = this.root
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i)
      if (!cur.next.get(char)) {
        cur.next.set(char, new Node())
      }
      cur = cur.next.get(char)
    }

    if (!cur.isWord) {
      cur.isWord = true
      this.size++
    }
  }

  //查询单词word是否包含在Trie中
  contains(word) {
    let cur = this.root
    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i)
      if (!cur.next().get(c)) {
        return false
      }
      cur = cur.next.get(c)
    }
    return cur.isWord
  }

  //查询在Trie中是否有单词以prefix为前缀
  isPrefix(prefix) {
    let cur = this.root
    for (let i = 0; i < prefix.length; i++) {
      let c = prefix.charAt(i)
      if (!cur.next.get(c)) {
        return false
      }
      cur = cur.next.get(c)
    }
    return true
  }

}

class Node {
  constructor(isWord = false) {
    // 该字符是否是单词的结尾
    this.isWord = isWord
    /**
     指向了该字符下面的节点
     用map的原因是因为Trie不像二叉树只有left和right两个子节点，Trie是多叉树，它的每个节点的子节点数量是不固定的
     */
    this.next = new Map()
  }
}
