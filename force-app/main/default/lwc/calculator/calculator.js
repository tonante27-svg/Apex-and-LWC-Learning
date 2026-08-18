
import { LightningElement } from 'lwc';
import Toast from 'lightning/toast';

export default class Calculator extends LightningElement {
    titleText = 'Calculator';
    messageText = '';
    variant = 'error';
    result = 0;
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
        console.log('Add Result: ' + this.result);
        return this.result;
    }
    handleSubtraction(){
        this.result = this.number1 - this.number2;
        console.log('Subtract Result: ' + this.result);
        return this.result;
    }
    handleMultiplication(){
        if(this.number1 && this.number2){
        this.result = this.number1 * this.number2;
        console.log('Add Result: ' + this.result);
        return this.result;
        }else{
            this.result = 0;
            this.essageText  = 'Please eneter both numbers';
            this.showToast();
        }
    }
    handleDivision(){
        if(this.number1 && this.number2){
        if(this.number2 != 0){
        this.result = this.number1 / this.number2;
        console.log('Add Result: ' + this.result);
        return this.result;
        }else{
               this.result = 0;
               this.messageText = 'Cannot divide by zero';
              this.showToast();
        }
        return this.result;
        }
    }
    showToast(){
        Toast.show({
            label: this.titleText,
            message: this.messageText,
            variant: this.variant
        });
    }

}   