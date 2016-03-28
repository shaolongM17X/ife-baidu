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
	}
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

	}
};

view.init();