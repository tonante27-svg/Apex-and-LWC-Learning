import { LightningElement,track,wire } from 'lwc';
import fetchToDoList from '@salesforce/apex/ReminderService.fetchToDoList';
import {NavigationMixin} from 'lightning/navigation';
export default class Reminder extends NavigationMixin(LightningElement) {

    @track toDoList = [];
    @track errors;
    showModal = false;
    editModal = false;
    @track selectedRecord;
    @track selectedEditRecord;

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
        this.selectedRecord = undefined;
        this.editModal = false;
    }

    handleRecordPreviewPage(event){
        event.preventDefault();
        
        let recordId = event.currentTarget.dataset.recordId;
        /* Use either Array.forEach() loop or Array.find()
        this.toDoList.forEach(todo=>{
            if(recordId == todo.Id){
                this.selectedRecord= todo;
            }
        });
        */

        this.selectedRecord = this.toDoList.find((item)=>{
            console.log(`===== PRINT RECORD ID ===> ${item.Id}`);
            return recordId === item.Id;
        });
    }

    handleRecordEditPage(event){
        event.preventDefault();
        let recordId = event.currentTarget.dataset.recordId;
        this.editModal = true;
        this.selectedEditRecord = this.toDoList.find((todo)=>{
            console.log(`===== PRINT RECORD ID ===> ${todo.Id}`);
            return recordId === todo.Id;
        });
       
    }
}