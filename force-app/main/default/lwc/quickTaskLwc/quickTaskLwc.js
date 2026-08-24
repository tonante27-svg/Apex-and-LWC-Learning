import { LightningElement } from 'lwc';
import createTask from '@salesforce/apex/QuickActionTaskService.createTask'
import Toast  from 'lightning/toast';

export default class QuickTaskLwc extends LightningElement {

    subject = '';
    description = ''


    handleSubject(e){this.subject = e.target.value;}
    handleDescription(e){this.description = e.target.value}
    
    handleCancel(){

    this.dispatchEvent(new CustomEvent('close'));
    }

    async handleSave(){
        if(!this.subject){
            this.handleToast('','Missing Subject', 'error');
            return;
        }
        try{
        const someId = await createTask({subject:this.subject, description:this.description});
            this.handleToast('Saved',`Task created (Id: ${someId})`,'success');
            this.dispatchEvent(new CustomEvent('saved'));
        }
        catch(err){
         const msg = (err?.body?.message) || (err?.message) || 'Unknown error';
        this.showToast('Error', msg, 'error');   
        }
    }

    handleToast(label,message,err){
        Toast.show({
            label: label,
            message:message,
            variant: err
     } );
    }
}
