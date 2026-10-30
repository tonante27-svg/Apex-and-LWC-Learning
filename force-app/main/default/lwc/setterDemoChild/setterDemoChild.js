import { LightningElement,api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    userDetail; // Used as shallow copy
   @api  
   get detail(){
    return this.userDetail;
   }

   set detail(data){
        console.log(data);
        let newData = {...data};
        newData.age *=2;
        newData.location = 'Tampa,Florida';
        this.userDetail = newData;
   }
}