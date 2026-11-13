import { LightningElement,track,wire } from 'lwc';
import fetchToDoList from '@salesforce/apex/ReminderService.fetchToDoList';
import CreateTaskModal from "c/createTaskComponent";
import {NavigationMixin} from 'lightning/navigation';
export default class Reminder extends NavigationMixin(LightningElement) {
    @track toDoList = [];
    @track errors;
    showModal = false;

    @wire(fetchToDoList)
    wiredReminder({data,error}){
        if(data){
            let currentDate = new Date();
           
            this.toDoList = data.map(todo=>{
                 let activityDate = todo.activityDate;
                 let activityDateConverted = new Date(activityDate) // COnverted to JS Date Format
                return {
                    ...todo,
                    headingStyle: currentDate > activityDateConverted  ? 'color:red' : ''
                };

                });
           
        }else if (error){
           this.errors = error;
           console.error(this.errors);
        }

    }

     handleClick(){
        this.showModal = true
       
    }

    handleClose(){
        this.showModal = false; 
    }

    handleRecordPreviewPage(event){
        event.preventDefault();
        let recordId = event.CurrentTarget.dataset.recordId;
         this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName:"view",
                recordId: "recordId",
                objectApiName: "Task"
            },
        });
    }

    handleRecordEditPage(event){
        event.preventDefault();
        let recordId = event.CurrentTarget.dataset.recordId;
         this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName:"edit",
                recordId: recordId,
                objectApiName: "Task"
            },
        });
    }
}