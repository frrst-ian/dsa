/* eslint-disable no-undef */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  prepareArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }
  
  buildTree(array) {
    const sortedArray = this.prepareArray(array);
  
    const build = (start, end) => {
      if (start > end) return null;
  
      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);
  
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
  
      return node;
    };
    return build(0, sortedArray.length - 1);
  }
  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertRec(node.right, value);
    } else {
      return node; // If the value already exists, don't insert it again
    }

    return node;
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this._deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteRec(node.right, value);
    } else {
      if (node.left === null) return node.left;
      if (node.right === null) return node.right;

      node.data = this._minValue(node.right);
      node.right = this._deleteRec(node.right, node.data);
    }

    return node;
  }

  _minValue(node) {
    let minv = node.data;
    while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }

  find(value) {
    return this._findRec(this.root, value);
  }

  _findRec(node, value) {
    if (node === null || node.data === value) return node;

    if (value < node.data) return this._findRec(node.left, value);
    return this._findRec(node.right, value);
  }

  // Level-order traversal
  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required");

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Inorder traversal
  inOrder(callback) {
    if (typeof callback !== 'function') throw new Error("Callback is required");
    this._inOrderRec(this.root, callback);
  }

  _inOrderRec(node, callback) {
    if (node === null) return;
    this._inOrderRec(node.left, callback);
    callback(node);
    this._inOrderRec(node.right, callback);
  }

  // Preorder traversal
  preOrder(callback) {
    if (typeof callback !== 'function') throw new Error("Callback is required");
    this._preOrderRec(this.root, callback);
  }

  _preOrderRec(node, callback) {
    if (node === null) return;
    callback(node);
    this._preOrderRec(node.left, callback);
    this._preOrderRec(node.right, callback);
  }

  // Postorder traversal
  postOrder(callback) {
    if (typeof callback !== 'function') throw new Error("Callback is required");
    this._postOrderRec(this.root, callback);
  }

  _postOrderRec(node, callback) {
    if (node === null) return;
    this._postOrderRec(node.left, callback);
    this._postOrderRec(node.right, callback);
    callback(node);
  }

  // Get the height of a node
  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Get the depth of a node
  depth(node) {
    return this._depthRec(this.root, node);
  }

  _depthRec(root, node, depth = 0) {
    if (root === null) return -1;
    if (root === node) return depth;

    const leftDepth = this._depthRec(root.left, node, depth + 1);
    if (leftDepth !== -1) return leftDepth;

    return this._depthRec(root.right, node, depth + 1);
  }

  // Check if the tree is balanced
  isBalanced() {
    return this._isBalancedRec(this.root);
  }

  _isBalancedRec(node) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this._isBalancedRec(node.left) &&
      this._isBalancedRec(node.right)
    ) {
      return true;
    }

    return false;
  }

  // Rebalance the tree
  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

// Pretty print function
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver script
function driverScript() {
  // Create a binary search tree from an array of random numbers < 100
  const randomArray = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 100)
  );
  const tree = new Tree(randomArray);

  console.log("Initial tree:");
  prettyPrint(tree.root);

  // Confirm that the tree is balanced
  console.log("Is the tree balanced?", tree.isBalanced());

  // Print out all elements in level, pre, post, and in order
  console.log("Level Order:");
  tree.levelOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nPre Order:");
  tree.preOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nPost Order:");
  tree.postOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nIn Order:");
  tree.inOrder((node) => process.stdout.write(node.data + " "));

  // Unbalance the tree by adding several numbers > 100
  console.log("\n\nUnbalancing the tree with numbers > 100");
  [105, 110, 115, 120, 125].forEach((num) => tree.insert(num));

  console.log("Unbalanced tree:");
  prettyPrint(tree.root);

  // Confirm that the tree is unbalanced
  console.log("Is the tree balanced?", tree.isBalanced());

  // Balance the tree
  console.log("Rebalancing the tree...");
  tree.rebalance();

  console.log("Balanced tree:");
  prettyPrint(tree.root);

  // Confirm that the tree is balanced
  console.log("Is the tree balanced?", tree.isBalanced());

  // Print out all elements in level, pre, post, and in order
  console.log("Level Order:");
  tree.levelOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nPre Order:");
  tree.preOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nPost Order:");
  tree.postOrder((node) => process.stdout.write(node.data + " "));
  console.log("\nIn Order:");
  tree.inOrder((node) => process.stdout.write(node.data + " "));
}

// Run the driver script
driverScript();
