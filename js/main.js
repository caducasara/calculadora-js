(function(win, doc) {
    'use strict';

    var $display = doc.querySelector('[data-js="display-value"]');
    var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
    var $buttonCE = doc.querySelector('[data-js="button-ce"]');
    var $buttonOperations = doc.querySelectorAll('[data-js="button-operation"]');
    var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

    function initialize() {
        initEvents();
    }

    function initEvents() {
        Array.prototype.forEach.call($buttonsNumbers, function(button) {
            button.addEventListener('click', handleClickNumber, false);
        });
        Array.prototype.forEach.call($buttonOperations, function(operation) {
            operation.addEventListener('click', handleClickOperation, false);
        });

        $buttonCE.addEventListener('click', handleClickCE, false);
        $buttonEqual.addEventListener('click', handleClickEqual, false);
    }


    function handleClickNumber() {
        $display.value += this.value;
    }

    function handleClickCE() {
        $display.value = 0;
    }

    function handleClickOperation() {
        $display.value = removeLastItemIfItIsAnOperator($display.value);
        $display.value += this.value;
    }

    function isLastItemOperation(number) {
        var operations = getOperation();
        var lastItem = number.split('').pop();
        return operations.some(function(operator) {
            return operator === lastItem;
        });
    }

    function getOperation(){
        return Array.prototype.map.call($buttonOperations, (function(button){ 
            return button.value;
        }));
    }

    function removeLastItemIfItIsAnOperator(string) {
        if (isLastItemOperation(string))
            return string.slice(0, -1);
        return string;
    }

    function handleClickEqual() {
        $display.value = removeLastItemIfItIsAnOperator($display.value)
        var allValues = $display.value.match(getRegexOperation());
        $display.value = allValues.reduce(calculateAllValues);
    }

    function getRegexOperation(){
        return new RegExp('\\d+[' + getOperation().join('\\') + ']?', 'g');
    }

    function calculateAllValues(accumulated, actual) {
        var firstValue = accumulated.slice(0, -1);
        var operator = accumulated.split('').pop();
        var lastValue = removeLastItemIfItIsAnOperator(actual);
        var lastOperator = getLastOperator(actual);
        return doOperation(operator, firstValue, lastValue) + lastOperator;
    }

    function getLastOperator(value){
        return isLastItemOperation(value) ? value.split('').pop() : '';
    }

    function doOperation(operator, firstValue, lastValue){
        switch (operator) {
            case '+':
                return Number(firstValue) + Number(lastValue);
            case '-':
                return Number(firstValue) - Number(lastValue);
            case '*':
                return Number(firstValue) * Number(lastValue);
            case '/':
                return Number(firstValue) / Number(lastValue);
        }
    }

    initialize();


}(window, document));
