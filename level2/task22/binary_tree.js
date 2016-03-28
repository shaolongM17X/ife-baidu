function BinarySearchTree() {
	this.root = null;
	this.length = 0;
}

BinarySearchTree.prototype = {
	constructor: BinarySearchTree,

	add: function (value) {
		function Node(value) {
			this.value = value;
			this.left = null;
			this.right = null;
		}
		var node = new Node(value);
		var current;
		this.length++;
		if (this.root === null) {
			this.root = node;
			return true;
		} else {
			current = this.root;
			
			while(true) {
				if (value < current.value) {
					if (current.left == null) {
						current.left = node;
						return true;
					} else {
						current = current.left;
					}
				} else if (value > current.value) {
					if (current.right == null) {
						current.right = node;
						return true;
					} else {
						current = current.right;
					}
				} else { // the values are the same. We drop the value
					return false;
				}
			}
		}

	},

	contains: function(value) {
		var current = this.root;
		while(current != null) {
			if (current.value > value) { // we should check the left child
				current = current.left;
			} else if (current.value < value) {
				current = current.right;
			} else {
				return true;
			}
		}
		return false;
	},
	// when the value doesn't exist, we will return false.
	// otherwise, it will return true;
	remove: function(value) {
		var current = this.root;
		var prev = this.root;
		var directionIsLeft = false;
		this.length--;
		while(current != null) {
			if (value < current.value) {
				prev = current;
				current = current.left;
				directionIsLeft = true;
			} else if (value > current.value) {
				prev = current;
				current = current.right;
				directionIsLeft = false;
			} else {
				break;
			}
		}
		if (current === null) {
			this.length++;
			return false; // when the value doesn't exist.
		}
		// Case 1: current node has no child.
		if (current.left === null && current.right === null) {
			// Case: current node is the root node
			if (current === this.root) {
				this.root = null;
				return true;
			} else {
				if (directionIsLeft) {
					prev.left = null;
				} else {
					prev.right = null;
				}
				return true;
			}
		}
		// Case 2 current node has only one child
		if (current.left === null && current.right != null) {
			if (directionIsLeft) {
				prev.left = current.right;
			} else {
				prev.right = current.right;
			}
			return true;
		}
		if (current.left != null && current.right === null) {
			if (directionIsLeft) {
				prev.left = current.left;
			} else {
				prev.right = current.left;
			}
			return true;
		}
		// Case 3: current node has two children
		var trav = current.right;
		var trav_prev = trav;
		while(trav.left != null) {
			trav_prev = trav;
			trav = trav.left;
		}
		trav.left = current.left;
		if (current === this.root) {
			this.root = trav;
		} else {
			if (directionIsLeft) {
				prev.left = trav;
			} else {
				prev.right = trav;
			}
		}
		if (trav_prev != trav) {
			trav_prev.left = null;
			trav.right = current.right;
		}
		return true;
	},
	size: function() {
		return this.length;
	},
	inOrder: function() {
		function inOrder_rec(node) {
			if (node == null) {
				return;
			}
			inOrder_rec(node.left);
			console.log(node.value);
			inOrder_rec(node.right);
		}
		inOrder_rec(this.root);
	},
	// return An array representation of the BST, 
	// where empty nodes are represented by ""
	toArray: function() {
		function toArray_rec(current_height, max_height, n, node, arr) {
			if (node != null) {
				arr[n - 1] = node.value;
			}
			if (current_height < max_height) {
				if (node == null) {
					toArray_rec(current_height+1, max_height, 2*n, null, arr);
					toArray_rec(current_height+1, max_height, 2*n + 1, null, arr);
				} else {
					toArray_rec(current_height+1, max_height, 2*n, node.left, arr);
					toArray_rec(current_height+1, max_height, 2*n + 1, node.right, arr);
				}
			}
		}
		var max_height = this.heightOfTree();
		var array = new Array(Math.pow(2, max_height)-1);
		toArray_rec(1, max_height, 1, this.root, array);
		return array;
	},
	heightOfTree: function() {
		function height_rec(node) {
			if (node === null) {return 0;}
			var left_height = height_rec(node.left);
			var right_height = height_rec(node.right);
			return 1 + Math.max(left_height, right_height);
		}
		return height_rec(this.root);
	},
};
var sb = new BinarySearchTree();
sb.add(8);
sb.add(3);
sb.add(1);
sb.add(6);
sb.add(4);
sb.add(7);
sb.add(10);
sb.add(14);
sb.add(13);