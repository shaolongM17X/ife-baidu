var $inputField = document.querySelector(".form-group #name");
var $span = document.querySelector(".additions");
var $submit = document.querySelector(".form-group input[type='button']");

$submit.addEventListener('click', function(e) {
	if ($inputField.value == '') {
		$span.innerHTML = "姓名不能为空";
		$span.classList.add("invalid-span");
		$span.classList.remove("valid-span");
		$inputField.classList.add("invalid-input-field");
	} else if (lengthIsValid($inputField.value)) {
		$span.innerHTML = "名称格式正确";
		$span.classList.add("valid-span");
		$span.classList.remove("invalid-span");
		$inputField.classList.remove("invalid-input-field");
	} else {
		$span.innerHTML = "名字应该为4~16位";
		$span.classList.add("invalid-span");
		$span.classList.remove("valid-span");
		$inputField.classList.add("invalid-input-field");
	}
});

function lengthIsValid(str) {
	var length = 0;
	for (var i = 0; i < str.length; i++) {
		var char = str.charAt(i);
		if (/[\u4e00-\u9fa5]/.test(char)) {
			length +=2;
		} else {
			length++;
		}
	}
	return length>=4 && length <= 16;
}