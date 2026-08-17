import { LightningElement } from 'lwc';

export default class NestedIfElse extends LightningElement 
{
    
    user; // A null object
    person={ name:'Jake Gai',age:22,title:'Jr. Manager'} ;
    grade = 0;
    isAPlus= false;
    isA = false;
    isB = false;
    handleMarks(event) {
        // Find the input element using the data-id and parse its value
        const inputElement = this.template.querySelector('lightning-input[data-id="gradeInput"]');
        const enteredValue = Number(inputElement ? inputElement.value : 0);
        this.grade = Number.isFinite(enteredValue) ? enteredValue : 0;

        // Reset flags
        this.isAPlus = false;
        this.isA = false;
        this.isB = false;

        // Compute grade flags with mutually exclusive ranges
        let marks = event.target.value;
        if (marks >= 95) {
            this.isAPlus = true;
            this.isA = false;
            this.isB = false;

        } else if (marks >= 89 && marks < 95) {
            this.isA = true;
            this.isB = false;
            this.isAPlus = false;
        } else if (marks >= 80 && marks < 89) {
            this.isB = true;
            this.isAPlus = false;
            this.isA = false;
        }
    }
    handleDefineUser(){
        this.user={
            name:"Jake Fleischman",
        }
    }
}
