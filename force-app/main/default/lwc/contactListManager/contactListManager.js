import { LightningElement } from "lwc";
import { add, reduceError, callApex } from "c/ldsUtils";
export default class ContactListManager extends LightningElement {
  handleClick(event) {
    event.preventDefault();
    let childComponent = this.refs.child;
    if (childComponent) {
      let sum = childComponent.handleSum(19, 34);
      console.log(`Sum is ${sum}`);
    }

    //** USe method from utility class **/
    let someNum = add(1, 3);
    console.log("someNum is: " + someNum);
  }
}
