import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {
 name
    constructor(){
        super()
        console.log('Parent constructor called.');
    }

    connectedCallback(){
        console.log('Parent connectedCallback called.');
    }

    renderedCallback(){
        console.log('Parent renderedCallback called.');
    }
    isChildVisible = false;
    handleClick(){
        this.isChildVisible=!this.isChildVisible;
    }
    // changeHandler(event){
    //     this.name = event.target.value;
    // }

    errorCallback(error,stack){
        console.log(error.message);
        console.log(stack);
    }
}