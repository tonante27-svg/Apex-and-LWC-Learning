import { LightningElement } from 'lwc';

export default class ContactListManager extends LightningElement {

    handleClick(event){
        event.preventDefault();
        let childComponent = this.refs.child;
        if(childComponent){
            let sum = childComponent.handleSum(19,34);
            console.log(`Sum is ${sum}`);
        }
    }


}