import { LightningElement,track } from 'lwc';
import Toast from 'lightning/toast';

export default class Calculator2 extends LightningElement {
    titleText = 'Calculator';
    messageText = '';
    variant = 'error';
    number1 = 0;
    number2 = 0;
    @track result = 0;

    handleNumberChange(event){
        if(event.target.label === "First Number"){
            this.number1 == parseInt(event.target.value);
        }else{
            this.number2 = parseInt(event.target.value);
        }
    }
   
    handleAddition(){
        this.result = parseInt(this.number1) + parseInt(this.number2);
        console.log('Add Result: ' + this.result);
        return this.result;
    }
    handleSubtraction(){
        this.result = parseInt(this.number1) - parseInt(this.number2);
        console.log('Subtract Result: ' + this.result);
        return this.result;
    }
    handleMultiplication(){
        if(this.number1 && this.number2){
        this.result = parseInt(this.number1) * parseInt(this.number2);
        console.log('Add Result: ' + this.result);
        return this.result;
        }else{
            this.result = 0;
            this.messageText  = 'Please eneter both numbers';
            this.showToast();
        }
    }

    handleDivision(){
        if(this.number1 && this.number2){
        if(this.number2 != 0){
        this.result = parseInt(this.number1) / parseInt(this.number1);
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