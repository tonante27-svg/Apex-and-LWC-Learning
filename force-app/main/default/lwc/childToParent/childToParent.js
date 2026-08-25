import { LightningElement } from 'lwc';

export default class ChildToParent extends LightningElement {

    handleFireEvent(){
        /** Step 1 prepare the event and fire the event*/ 
        this.dispatchEvent(new CustomEvent('datachange',{
           detail:{
                message: 'This is from the child component',
                source: 'child'
            }
        }));
    }
}