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
            prepareFormOfStyle('bootstrap');
            componentHandler.upgradeDom();
        }

    });
}

function prepareFormOfStyle(style) {
    var $generatedForm = $("#generatedFrom");
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
}

function FormList(name, type, func) {
    this.label = name;
    this.type = type;
    this.validator = func;
}

function addInputField(style, $generatedForm, name, validator) {
    var newInputField = new FormList(name, 'text', prepareValidators(name));
    prepareDOMnodeFor(style, $generatedForm, newInputField);
}

function prepareValidators(name) {
    var validator = {};
    if (name == 'name') {
        validator.msg = new Map();
        validator.msg.set('invalid', "Your name is invalid since it contains special characters.")
        validator.msg.set('success', "This name seems valid.");
        validator.check = function(val) {
            return /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]+$/.test(val);
        }
    }
    if (name == 'password') {

    }
    if (name == 'email') {

    }
    if (name == 'phone') {

    }
    return validator;
}

function prepareDOMnodeFor(style, $generatedForm, formlist) {

    var innerHTMLtoAppend = '';
    if (style == 'material') {
        innerHTMLtoAppend += '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">';
        innerHTMLtoAppend += '<input class="mdl-textfield__input" type="' + formlist.type + '" id="' + formlist.label + '">';
        innerHTMLtoAppend += '<label class="mdl-textfield__label" for="' + formlist.label + '">' + formlist.label + '</label>';
        innerHTMLtoAppend += '<span class="mdl-textfield__error" id="msgFor' + formlist.label + '"></span></div>'
        $generatedForm.html($generatedForm.html() + innerHTMLtoAppend);
    }
    var $newNode = $("#" + formlist.label);
    var $msg = $("#msgFor" + formlist.label);
    setUpEventListener($newNode, $msg, formlist);
}

function setUpEventListener($newNode, $msg, formlist) {
    console.log($newNode);
    $newNode.keyup(function() {
        console.log($newNode);
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
