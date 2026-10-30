import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    displayModal=false;
    msg;

    handleClick(){
        this.displayModal = true;
        //console.log('Inside the Parent component');
    }
    handleModal(event){
        //console.log('Did we Get to Parent Close Modal ?');
        this.msg = event.detail.msg;
        this.displayModal=false;
    }
}