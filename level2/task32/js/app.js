function main() {
    getRequirementFromUser();
}

// This function attaches event listener to the Generate button in the
// input form, so that when clicked, we will generate a form based on the 
// requirements
function getRequirementFromUser() {
    $("#generate").click(function(e) {
        e.preventDefault();
        if (userWants($("#material-design"))) {
            prepareFormOfStyle('material');
            componentHandler.upgradeDom();
        } else {
            prepareFormOfStyle('nothing');
            componentHandler.upgradeDom();
        }

    });
}

function prepareFormOfStyle(style) {
    var $generatedForm = $("#generatedFrom");
    $generatedForm.html('');
    if (userWants($("#name-input"))) {
        addInputField(style, $generatedForm, 'name');
    }
    if (userWants($("#password-input"))) {
        addInputField(style, $generatedForm, 'password');
    }
    if (userWants($("#email-input"))) {
        addInputField(style, $generatedForm, 'email');
    }
    if (userWants($("#phone-input"))) {
        addInputField(style, $generatedForm, 'phone');
    }
    addSubmitButton($generatedForm);
}

function addSubmitButton($generatedForm) {
    $generatedForm.append('<button class="mdl-button mdl-js-button mdl-button--primary" id="submit-btn">Submit</button>');
    $("#submit-btn").click(function(e) {
        e.preventDefault();
        var $validators = $("span[id^=msgFor]");
        for (var i = 0; i< $validators.length; i++) {
            if ($validators[i].style.color == 'red') {
                alert("The form is not ready..");
                return;
            }
        }
        alert("The form is ready.");
    });
}

function FormList(name, type, func) {
    this.label = name;
    this.type = type;
    this.validator = func;
}

function addInputField(style, $generatedForm, name, validator) {
    var type = name == 'password'? 'password' : 'text';
    var newInputField = new FormList(name, type, prepareValidators(name));
    prepareDOMnodeFor(style, $generatedForm, newInputField);
}

function prepareValidators(name) {
    var validator = {};
    validator.msg = new Map();
    validator.msg.set('success', "This " + name +" seems valid.");
    if (name == 'name') {
        validator.msg.set('invalid', "Your name is invalid since it contains special characters.")
        validator.check = function(val) {
            return /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]+$/.test(val);
        }
    }
    if (name == 'password') {
        validator.msg.set('invalid', "Your password should contain special characters, numbers and both lower case and upper case, and should be at least 8 characters.");
        validator.check = function(val) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(val);
        }
    }
    if (name == 'email') {
        validator.msg.set('invalid', "Your email address is invalid..");
        validator.check = function(val) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
        }
    }
    if (name == 'phone') {
        validator.msg.set('invalid', "Your phone number is not correct..");
        validator.check = function(val) {
            return /^\d+$/.test(val);
        }
    }
    return validator;
}

function prepareDOMnodeFor(style, $generatedForm, formlist) {

    var innerHTMLtoAppend = '';
    if (style == 'material') {
        innerHTMLtoAppend += '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">';
        innerHTMLtoAppend += '<input class="mdl-textfield__input" type="' + formlist.type + '" id="' + formlist.label + '">';
        innerHTMLtoAppend += '<label class="mdl-textfield__label" for="' + formlist.label + '">' + formlist.label + '</label>';
        innerHTMLtoAppend += '<span class="mdl-textfield__error" id="msgFor' + formlist.label + '" style="color:red"></span></div>'
        $generatedForm.append(innerHTMLtoAppend);
    } else {
        innerHTMLtoAppend += '<label for="' + formlist.label + '">' + formlist.label + '</label><br>';
        innerHTMLtoAppend += '<input type="' + formlist.type + '" id="' + formlist.label + '"><br>';
        innerHTMLtoAppend += '<span id="msgFor' + formlist.label + '" style = "color:red"></span></div><br>'
        $generatedForm.append(innerHTMLtoAppend);
    }
    var $newNode = $("#" + formlist.label);
    var $msg = $("#msgFor" + formlist.label);
    setUpEventListener($newNode, $msg, formlist);
}

function setUpEventListener($newNode, $msg, formlist) {
    $newNode.keyup(function() {
        if (formlist.validator.check($newNode.val())) { // the input value is valid
            $msg.html(formlist.validator.msg.get('success'));
            $msg.css('visibility', 'visible');
            $msg.css('color', 'green');
        } else {
            $msg.html(formlist.validator.msg.get('invalid'));
            $msg.css('visibility', 'visible');
            $msg.css('color', 'red');
        }
    });
}


function userWants($node) {
    return $node.prop('checked');
}


$(document).ready(main);
