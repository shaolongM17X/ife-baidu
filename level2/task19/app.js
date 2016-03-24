var helper = {
    inputIsValid: function(input) {
        if (/^\d+$/.test(input)) {
            var num = parseInt(input);
            return num >= 10 && num <= 100;
        }
        return false;
    },
    insertNumber: function(num, direction) {
        if (this.inputIsValid(num)) {
            if (modal.numberList.length <= 60) {
                if (direction == 'left') {
                    modal.numberList.unshift(num);
                } else {
                    modal.numberList.push(num);
                }
                view.render();
            } else {
                alert("That's too much man");
            }
        } else {
            alert("Please give me a number in [10, 100] laaa");
        }
    },
    multiplier: 3,
}

var modal = {
    numberList: [],
};

var controller = {
    getNumberList: function() {
        return modal.numberList;
    },
    // 从左边加入数字
    leftIn: function(num) {
        helper.insertNumber(num, 'left');
    },
    // 从右边加入数字
    rightIn: function(num) {
        helper.insertNumber(num, 'right');
    },
    // 左边出去
    leftOut: function() {
        modal.numberList.shift();
    },
    // 右边出去
    rightOut: function() {
        modal.numberList.pop();
    },
    removeAt: function(pos) {
        modal.numberList.splice(pos, 1);
    },
    generate_random_numbers: function() {
        modal.numberList = [];
        for(var i = 0; i < 50; i++) {
            var num = Math.floor((Math.random() * 90) + 10);
            modal.numberList.push(num);
        }
    }
};

var view = {
    $list: document.getElementById("list-container"),
    init: function() {
        var $left_in_button = document.getElementById("from-left-in");
        var $right_in_button = document.getElementById("from-right-in");
        var $left_out_button = document.getElementById("from-left-out");
        var $right_out_button = document.getElementById("from-right-out");
        var $input_text = document.getElementById("text");
        $left_in_button.addEventListener('click', function() {
            controller.leftIn($input_text.value);
            $input_text.value = "";
            view.render();
        });
        $right_in_button.addEventListener('click', function() {
            controller.rightIn($input_text.value);
            $input_text.value = "";
            view.render();
        });
        $left_out_button.addEventListener('click', function() {
            controller.leftOut();
            view.render();
        });
        $right_out_button.addEventListener('click', function() {
            controller.rightOut();
            view.render();
        });
        var $random_generating_button = document.getElementById("random-50");
        $random_generating_button.addEventListener('click', function() {
            controller.generate_random_numbers();
            view.render();
        });
        view.render();
    },
    render: function() {
        var list = controller.getNumberList();
        var htmlToAppend = '';
        for (var i = 0; i < list.length; i++) {
            // because the height in original input number is too short, I multiply it by a constant hold in helper object
            htmlToAppend += '<li id="list-item' + i + '" style="height: ' + list[i] * helper.multiplier + 'px;"></li>'
        }
        this.$list.innerHTML = htmlToAppend;
        for (var i = 0; i < list.length; i++) {
            // we have to pass the i inside a function that returns a function, so that the innermost i will be able to be accessed afterwards.
            // otherwise, the i will increase as the for loop goes, and when we click the element, it will go back to our function and use the newest i, which is the last i, and therefore will always remove the last element.
            document.getElementById("list-item" + i).addEventListener('click', (function(i) {
                return function() {
                    controller.removeAt(i);
                    view.render();
                }
            })(i));
        }
    }
};


view.init();
