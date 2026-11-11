// Dynamic Creation of. any object record  incuding picklist handling.

import { LightningElement,wire,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import {getPicklistValues } from 'lightning/uiObjectInfoApi';
import TASK_OBJECT from '@salesforce/schema/Task';
import STATUS_FIELD from '@salesforce/schema/Task.Status';
import PRIORITY_FIELD from '@salesforce/schema/Task.Priority';
import { CloseActionScreenEvent } from 'lightning/actions';
import fetchPickListValues from '@salesforce/apex/ReminderService.fetchPickListValues';
import createToDoItem from '@salesforce/apex/ReminderService.createToDoItem';
import Toast from 'lightning/toast';
import ActivityDate from '@salesforce/schema/Task.ActivityDate';

export default class CreateTaskComponent extends LightningElement {

    subjectValue;
    dateValue;
    statusValue='';
    priorityValue='';
    commentValue;
    isLoading=false;

    recordToCreate ={
        "Status":"",
        "ActivityDate":null,
        "Subject":"",
        "Description":"",
        "Priority":""
    }

    @track statusOptions = [];
    @track priorityOptions = [];

    //picklists - Status
    @wire(fetchPickListValues,{objApiName:"Task",fieldApiName:"Status"})
    wirePicklistStatus({data,error}){
        if(data){
            this.statusOptions = data;
            console.log('=====GOT IT === '+data);
            
        }else if(error){
            console.error(error);
        }
    }

    //picklists - Status
    @wire(fetchPickListValues,{objApiName:"Task",fieldApiName:"Priority"})
    wirePicklistPriority({data,error}){
        if(data){
             this.priorityOptions = data;
            console.log('=====GOT IT === '+data);
            
        }else if(error){
            console.error(error);
        }
    }

    handleOnChange(event) {
        event.preventDefault();
        const fieldName = event.target.name;
        const fieldValue = event.detail?.value ?? event.target.value;

        this.recordToCreate[fieldName] = fieldValue;
    }   

    handleClick(event){
        event.preventDefault();
        
        if(event.currentTarget.name === 'create'){
            // Validate all lightning input and combo boxes that are reuired
            const allValid  = this.validateRequiedInputTypes();
            console.log('We afiled? ===> '+allValid);
            if(!allValid){
                this.callToast('Order Entry Error','Please update the invalid form entries and try again','error');
                return;
            }else{
                //Need to make this dynamic by passing objApiName and recordToCreate to another Apex Method called CreateRecord
                if(!this.objApiName){
                        this.objApiName = 'Task';
                }
            
                this.isLoading = true;
                this.createNewRecord();
                        
            }
        }else if(event.currentTarget.name === 'cancel'){
            this.dispatchEvent(new CloseActionScreenEvent());
            this.subjectValue = '';
            this.dateValue = '';
            this.statusValue ='';
            this.priorityValue = '';
            this.commentValue = '';
        }
    }
    //Validate all required input types - inputs or comboboxes
    validateRequiedInputTypes(){
        const allValid = [
            ...this.template.querySelectorAll('lightning-input, lightning-combobox' ),
            ].reduce((validSoFar, inputCmp)=>{
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
            console.log('INside validateRequiedInputTypes: ===> '+allValid);
            return allValid;
    }   
    async createNewRecord(){
        try{
            console.log(`OBJECT NAME:===> ${this.objApiName}`);
            console.log(`FILED VALUES:===> ${this.recordToCreate}`);
            let resultId = await createToDoItem({
                                                objApiName:this.objApiName,
                                                fieldValues:this.recordToCreate
            });
            console.log(`Result ID = >${resultId}`);
            this.callToast('Successfully Created A Record','A New '+this.objApiName+' was created.','success');
        }catch(error){
            this.callToast('Exception Thrown',error.body.message,'error');
        }finally{
            this.isLoading = false;
        }
    }

    callToast(lab,msg,btype){
        Toast.show({
            label:lab,
            message:msg,
            variant:btype,
            dismissible:true,
        },this);

    }
}