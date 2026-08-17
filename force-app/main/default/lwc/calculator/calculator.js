import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {


    number1 = 0;
    number2 = 0;
    handlerNumber1Change(event) {
        this.number1 = parseInt(event.target.value);
    }
    handlerNumber2Change(event) {
        this.number2 = parseInt(event.target.value);
    }
    handleAddition(){
        this.result = this.number1 + this.number2;
        return this.number1 + this.number2;
    }
    handleSubtraction(){
        this.result = this.number1 - this.number2;
        return this.number1 - this.number2;
    }
    
}