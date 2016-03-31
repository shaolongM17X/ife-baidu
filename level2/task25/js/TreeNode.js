function TreeNode(node) {
	this.type = node.type;
	this.name = node.name;
	this.parent = node.parent;
	this.children = [];

	this.domNode = node.domNode;
	this.domNode.TreeNode = this;
}



TreeNode.prototype = {
	constructor: TreeNode,

	addChild: function(type, name, basePoint) {
		var node = document.createElement('li');
		node.className = 'list'; // because it will be a list item
		this.domNode.lists.appendChild(node);
		if (basePoint === null) {
			basePoint = 1;
		}
		var newTreeNode = new TreeNode({
			type: type,
			parent: this,
			domNode: node,
			name: name,
		});
		newTreeNode.renderNode(node, type);
		this.children.push(newTreeNode);
		return this.backToBasePoint(newTreeNode, basePoint);
	},
	
	backToBasePoint: function(node, basePoint) {
		for (var i = 1; i < basePoint; i++) {
			if (node.parent === null) {
				return node;
			} else {
				node = node.parent;
			}
		}
		return node;
	},	

	renderNode: function(node) {
		if (node.TreeNode.type == 'container') {
			node.innerHTML = '<i class="material-icons">clear</i><span>' + node.TreeNode.name + '</span><i class="material-icons modal-trigger" data-target="addNewNode">add</i>';
			var lists = document.createElement('ul');
			lists.className = "lists is-closed";
			node.lists = lists;
			node.appendChild(lists);
		} else {
			node.innerHTML = '<i class="material-icons">clear</i><a>' + node.TreeNode.name + '</a>';
		}
	},

	remove: function(node) {

	},
};

