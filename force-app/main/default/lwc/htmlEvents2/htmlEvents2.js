import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertNewEmployee from  '@salesforce/apex/EmployeeController.insertNewEmployee';
export default class HtmlEvents2 extends LightningElement {
    name = '';
    phone = '';
    email = '';
    age = 0;
    address = '';
    salary = 0;

     handleNameChange(event){
        console.log('handleNameChange');
        const inputValue = event.target.value;
        const namePattern = /^[a-zA-Z\s]*$/;
        namePattern.test(this.inputVaue);
        console.log('Is name valid?', namePattern.test(inputValue));
        this.name = inputValue;
    }
    handleEmailChange(event){
        console .log('handleEmailChange');
        const inputValue = event.target.value;
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        emailPattern.test(inputValue);
        this.email = inputValue;
    }
    handlePhoneChange(event){
        console .log('handleEmailChange');
        const inputValue = event.target.value;
        const phonePattern = /^\d{10}$/; 
        console.log('Is phone valid?', phonePattern.test(inputValue));
        this.phone = inputValue;
    }
    handleInsertRecord(){
        const nameField = this.template.querySelector('lightning-input[data-id="empName"]');
        this.name = nameField ? nameField.value : '';
        const emailField = this.template.querySelector('lightning-input[data-id="empEmail"]');
        this.email = emailField ? emailField.value : '';
        const phoneField = this.template.querySelector('lightning-input[data-id="empPhone"]');
        this.phone = phoneField ? phoneField.value : '';
        const ageField = this.template.querySelector('lightning-input[data-id="empAge"]');
        const enteredAge = Number(ageField ? ageField.value : 0);
        this.age = Number.isFinite(enteredAge) ? enteredAge : 0;
        const salaryField = this.template.querySelector('lightning-input[data-id="empSalary"]');
        const enterdSalary = Number(salaryField ? salaryField.value : 0);
        this.salary = Number.isFinite(enterdSalary) ? enterdSalary : 0;
        console.log('Record to Insert:', { name: this.name, email: this.email, salary: this.salary })
        
        insertNewEmployee({ 
            name: this.name, 
            email: this.email, 
            phone: this.phone, 
            age: this.age, 
            salary: this.salary 
        })
        .then(() => {
            // SHOW SUCCESS MESSAGE
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Employee created successfully!',
                    variant: 'success',
                }),
            );
            
            // CLEAR THE FORM
            this.clearForm();
        })
        .catch(error => {
            // SHOW ERROR MESSAGE
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }
    clearForm() {
        // 1. Reset JS properties
        this.name = '';
        this.email = '';
        this.phone = '';
        this.age = 0;
        this.salary = 0;

        // 2. Reset the actual HTML input values
        const inputs = this.template.querySelectorAll('lightning-input');
        inputs.forEach(input => {
            input.value = ''; // Clear the text
            input.setCustomValidity(''); // Clear any red error messages
        });
    }
}