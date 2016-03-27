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
};