const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const numberButtons = $$("[data-number]");
const operationButtons = $$("[data-operation]");
const equalsButton = $("[data-equals]");
const deleteButton = $("[data-delete]");
const allClearButton = $("[data-all-clear]");
const previousOperandTextElement = $("[data-previous-operand]");
const currentOperandTextElement = $("[data-current-operand]");

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    // Clear all different variable.
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    // Clearing the single number
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendedNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();      
    }
    chooseOperation(operation){
        if(this.currentOperand == ''){
            return;
        }
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        let result;
        
        const prevElement = parseFloat(this.previousOperand);
        const currentElement = parseFloat(this.currentOperand);

        if(isNaN(prevElement) || isNaN(currentElement)){
            return;
        }
        switch(this.operation){
            case "+": 
                result = prevElement + currentElement;
                break;
            case "-":
                result = prevElement - currentElement;
                break;
            case "*":
                result = prevElement * currentElement;
                break;
            case "÷":
                result = prevElement / currentElement;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendedNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})