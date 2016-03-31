var $root = document.getElementById("root");
var rootNode = new TreeNode({
	type: 'container',
	name: 'root',
	parent: null,
	domNode: $root,
});
var $rootUl = document.getElementById("rootUl");
console.log($rootUl);
$root.lists = $rootUl;


$root.addEventListener('click', function(e) {
	if (e.target.tagName.toLowerCase() == 'span' && e.target.parentNode.lists.childNodes.length) {
		e.target.parentNode.lists.classList.toggle("is-closed");
		return;
	}
	if (e.target.tagName.toLowerCase() == 'li' && e.target.lists && e.target.lists.childNodes.length) {
		e.target.lists.classList.toggle("is-closed");
		return;
	}
	if (e.target.innerHTML == 'clear') {
		var $toDelete = e.target.parentNode;
		var treeNode = $toDelete.TreeNode;
		// treeNode.parent.children
		return;
	}
	if (e.target.innerHTML == 'add') {
		console.log('add link');
		return;
	}
});


















rootNode.addChild('container', 'nab').addChild('container','sb').addChild('container', 'ssb').addChild('link','nb');
rootNode.addChild('container', 'nab');
$('.modal-trigger').leanModal();
$('select').material_select();