import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {

  @api contact;
  @api componentType;

    constructor(){
        super();
         console.log('Inside child constructor');

    }
    connectedCallback() {
      // debugger;
         console.log('I\'m From Child Connected Callback');
      // console.log('Child contact:', this.contact);
      // console.log('Child componentType:', this.componentType);
    //throw new Error('Message is error in connectedCallBack');

    }
    renderedCallback(){
        console.log('I\'m from child component renderedCallback');
    }  

    disconnectedCallback(){
        console.log('I\'m from Child  disconnectedCallback');
        this.remove3rdPartyLibraries();
        this.removeEventListeners();

    }

    remove3rdPartyLibraries(){
        console.log('Libaries to be removed');
    }
    removeEventListeners(){
      console.log('Listeners to be removed');
    }

}