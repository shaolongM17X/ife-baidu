var $root = document.getElementById("root");
var rootNode = new TreeNode({
	type: 'container',
	name: 'root',
	parent: null,
	domNode: $root,
});
var $rootUl = document.getElementById("rootUl");
$root.lists = $rootUl;



















rootNode.addChild('container', 'nab').addChild('container','sb').addChild('container', 'ssb').addChild('link','nb');
rootNode.addChild('container', 'nab');