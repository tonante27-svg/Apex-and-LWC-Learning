import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {

  @api contact;
  @api componentType;

    constructor(){
        super();
        debugger;
         console.log('Inside child constructor');

    }
    connectedCallback() {
         console.log('From Child Connected Callback');
        console.log('Child contact:', this.contact);
        console.log('Child componentType:', this.componentType);
    }

}