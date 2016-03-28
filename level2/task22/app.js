var modal = {
	binaryTree: undefined,
};

var controller = {
	addIntoTree: function(value) {
		function inputIsValid(value) {
			return /^\d+$/.test(value);
		}
		if (inputIsValid(value)) {
			modal.binaryTree.add(value);
		}
	},
	getArrayRepresentation: function() {
		return modal.binaryTree.toArray();
	},
	getHeight: function() {
		return modal.binaryTree.heightOfTree();
	},
};

var view = {
	init: function() {
		modal.binaryTree = new BinarySearchTree();
		$addButton = document.getElementById("add-btn");
		$addButton.addEventListener('click', function() {
			$inputField = document.getElementById("valueToAdd");
			var input_value = $inputField.value;
			controller.addIntoTree(input_value);
			$inputField.value = '';
			view.render();
		});
	},

	render: function() {
		var arr = controller.getArrayRepresentation();
		var htmlArr = arr.map(function(value, pos) {
			var power = Math.floor(Math.log2(pos + 1));
			var width = 100 / (Math.pow(2,power));
			if (value == '#') {
				return '<li style="width:'+ width + '%"></li>';
			}
			return '<li style="width:'+ width + '%"><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" id="value' + value+ '">' + value+'</button></li>';
		});
		console.log(htmlArr);
		var height = controller.getHeight();
		$tree = document.getElementById('tree');
		$tree.innerHTML = '';
		for (var i = 1; i <= Math.pow(2, height - 1); i = 2*i) {
			$tree.innerHTML = $tree.innerHTML + '<ul id="containerFor' + i + '"></ul>';
			$container = document.getElementById("containerFor"+i);
			var htmlToAppend = '';
			for (var j = i-1; j <= 2*i - 2; j++) {
				htmlToAppend += htmlArr[j];
			}
			$container.innerHTML = htmlToAppend;
		}
	}
};

view.init();