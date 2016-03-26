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
    rate: 50,

    mergeSort: function() {
        var arr = modal.numberList;
        var temp = new Array(arr.length);
        var aniQue = helper.scheduler(function() {}, 0); // <-------------- Have a look
        helper.merge_rec(arr, temp, 0, arr.length - 1, aniQue);
    },
    merge_rec: function(arr, temp, start, end, aniQue) {
        if (start >= end) {
            return;
        }
        var mid = Math.floor(start + (end - start) / 2);
        helper.merge_rec(arr, temp, start, mid, aniQue);
        helper.merge_rec(arr, temp, mid + 1, end, aniQue);
        helper.merge(arr, temp, start, mid, end, aniQue);
    },
    merge: function(arr, temp, start, mid, end, aniQue) {
        function renderSort(pos, value) {
            aniQue.delay(function() {
                document.getElementById("list-item"+pos).className = "blue";
            }, 0);
            if (value != null) { // we need to modify the height
                aniQue.delay(function() {
                    document.getElementById("list-item" + pos).style.height = value * helper.multiplier + "px";
                }, 0);
            }
            aniQue.delay(function() {
                document.getElementById("list-item"+ pos).className = "red";
            }, helper.rate);
        }
        var i = start;
        var j = mid + 1;
        var k = start;
        while (i <= mid && j <= end) {
            // renderSort(i);
            // renderSort(j);
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) {
            temp[k++] = arr[i++];
        }
        while (j <= end) {
            temp[k++] = arr[j++];
        }
        for (var i = start; i <= end; i++) {
            arr[i] = temp[i];
            var value = arr[i];
            renderSort(i, value);
        }
    },
    scheduler: function delay(fn, t) {
        // reference: http://stackoverflow.com/questions/6921275/is-it-possible-to-chain-settimeout-functions-in-javascript
        // author: jfriend00

        // private instance variables
        var queue = [],
            self, timer;

        function schedule(fn, t) {
            timer = setTimeout(function() {
                timer = null;
                fn();
                if (queue.length) {
                    var item = queue.shift();
                    schedule(item.fn, item.t);
                }
            }, t);
        }
        self = {
            delay: function(fn, t) {
                // if already queuing things or running a timer, 
                //   then just add to the queue
                if (queue.length || timer) {
                    queue.push({ fn: fn, t: t });
                } else {
                    // no queue or timer yet, so schedule the timer
                    schedule(fn, t);
                }
                return self;
            },
            cancel: function() {
                clearTimeout(timer);
                queue = [];
            }
        };
        return self.delay(fn, t);
    },
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
        for (var i = 0; i < 50; i++) {
            var num = Math.floor((Math.random() * 90) + 10);
            modal.numberList.push(num);
        }
    },
    sort: function() {
        helper.mergeSort();
    },
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
        var $sort_button = document.getElementById("sort");
        $sort_button.addEventListener('click', function() {
            controller.sort();
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
