const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      let current = this.rootNode;
      while (current) {
        if (data < current.data) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  }

  has(data) {
    function findNode (node, data) {
      if (node === null) {
        return null;
      } else if (data < node.data) {
        return findNode(node.left, data);
      } else if (data > node.data) {
        return findNode(node.right, data);
      } else {
        return node;
      }
    }
    return findNode(this.rootNode, data) !== null;
  }

  find(data) {
    function findNode (node, data) {
      if (node === null) {
        return null;
      } else if (data < node.data) {
        return findNode(node.left, data);
      } else if (data > node.data) {
        return findNode(node.right, data);
      } else {
        return node;
      }
    }
    return findNode(this.rootNode, data);
  }

  remove(data) {
    function minimalNode (node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }

    function removeNode (data, node) {
      if (node === null) return null;

      if (data < node.data) {
        node.left = removeNode(data, node.left);
      } else if (data > node.data) {
        node.right = removeNode(data, node.right);
      } else if (data === node.data) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        if (node.left && node.right) {
          const minNode = minimalNode(node.right);
          node.data = minNode.data;
          node.right = removeNode(minNode.data, node.right);
        }
      }
      return node;
    }
    this.rootNode = removeNode(data, this.rootNode);
  }

  min() {
    if (this.rootNode === null) return;
    let currentNode = this.rootNode;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) return;
    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};