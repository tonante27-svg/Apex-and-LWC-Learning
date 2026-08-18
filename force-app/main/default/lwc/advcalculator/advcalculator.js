import { LightningElement } from 'lwc';
import Toast from 'lightning/toast';

export default class Advcalculator extends LightningElement{
    evalString= '';
    outputValue = '';
    operator;
    result = 0;

    handleButtonType(evt){
        debugger;

        const buttonType = evt.target.label;
        console.log('Button Type: ' + buttonType);
        const isNumber = !isNaN(buttonType);
        const isDecimal = buttonType === '.';
        const isOperator = ['+', '-', '*', '/'].includes(buttonType);
       
        //check if a non-number value ,that is not a decimal, is being added to an empty string
        if(this.evalString.length === 0){

            if(!isNumber && !isDecimal){ 
                this.showToast('Error', 'Please enter a number first', 'error');
                return;
            }

        }
        if(this.evalString.length > 0){
            const numbers = this.evalString.split(/[+\-*/]/);
            const currentNumber = numbers[numbers.length - 1];
            let lenpos  = this.evalString.length - 1;
            let isNonNumLastChar = ['+', '-', '*', '/','.'].includes(this.evalString.charAt(lenpos));
            if(isNonNumLastChar &&  (isOperator || isDecimal)) {  
                this.showToast('Error', 'Can\'t have. consecutive non-numbers next to each other', 'error');
            }
            if(isDecimal && currentNumber.includes('.') ){
                this.showToast('Error', 'Can\'t have. consecutive decimal points next to each other',   'error');
                return;
            }else{
                
                if(buttonType === "="){
                this.outputValue = eval(this.evalString);
                return;
                }
            }
            
            
               
        }
        this.evalString = this.evalString + buttonType;
    }

    handlerClear(){
        this.evalString = '';
        this.outputValue = '';
    }
    
    handleBackspace(){
        if (this.evalString.length > 0) {
            this.evalString = this.evalString.substring(0,this.evalString.length - 1);
            console.log(this.evalString);
        }
    }

    showToast(_title, _message, _variant){
        console.log('Show Toast: ' + _title + ' ' + _message + ' ' + _variant);
        Toast.show({
            label: _title,
            message: _message,
            variant: _variant
        });
    }
}