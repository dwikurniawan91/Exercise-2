class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement    
        this.clear()
    }


clear()  {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    }

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

appendNumber(number) { /*Menambahkan number ke currentOperand ketika numberButton diclick*/
    if (number==='.' && this.currentOperand.includes('.')) return /*user hanya boleh melakukan operrand titik '.' sekali*/
    this.currentOperand = this.currentOperand.toString() + number.toString() /*Merubah currentOperand jadi string agar ketika user menklik number, currentOperand tidak melakukan penambahan melainkan concation*/

    }

chooseOperation(operation){ /* aktifitas ketika user menklik operationButton*/
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand /*Menset currentOperand ke previousOperand*/ 
    this.currentOperand =''
    }

compute() { /*Melakukan komputasi ketika operationButton diklik*/
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break;
        case '-':
            computation = prev - current
            break;
        case '*':
            computation = prev * current
            break;
        case '÷':
            computation = prev / current
            break;
        default:
           return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

getDisplayNumber(number) { 
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    }else{
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }else {
        return integerDisplay
    }
}

updateDisplay() { //update nilai yg ada di currentOperand dan previousOperand*/
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else {
        this.previousOperandTextElement.innerText = ''
    }
    
}
}
/*selecting button and element*/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton= document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) /*membuat object*/
numberButtons.forEach(button => { /*menampilkan number di display ketika user menglik numberButton*/ 
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})