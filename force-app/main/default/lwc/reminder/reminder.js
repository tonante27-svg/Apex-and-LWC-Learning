import { LightningElement,track,wire } from 'lwc';
import fetchToDoList from '@salesforce/apex/ReminderService.fetchToDoList';
import {NavigationMixin} from 'lightning/navigation';
export default class Reminder extends NavigationMixin(LightningElement) {
    @track toDoList = [];
    @track errors;
    showModal = false;

    @wire(fetchToDoList)
    wiredReminder({data,error}){
        if(data){
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            this.toDoList = data.map(todo => {
                let activityDateConverted = new Date(todo.ActivityDate);
                activityDateConverted.setHours(0, 0, 0, 0);

                let isOverdue = currentDate > activityDateConverted;

                return {
                    ...todo,
                    headingClass: `heading-container ${isOverdue ? 'overdue-heading' : 'normal-heading'}`,
                    textClass: `text-container ${isOverdue ? 'overdue-heading' : 'normal-heading'}`
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
        let recordId = event.currentTarget.dataset.recordId;
         this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName:"view",
                recordId: recordId,
                objectApiName: "Task"
            },
        });
    }

    handleRecordEditPage(event){
        event.preventDefault();
        let recordId = event.currentTarget.dataset.recordId;
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