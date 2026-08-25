import { LightningElement } from 'lwc';

export default class ParentFromChild extends LightningElement {
message;
source;

    handleDataChange(event){
        this.message = event.detail.message;
        this.source = event.detail.source;
        console.log(`The message is handled ${this.message}`);
        console.log(`The source is handled ${this.source}`);
    }
}