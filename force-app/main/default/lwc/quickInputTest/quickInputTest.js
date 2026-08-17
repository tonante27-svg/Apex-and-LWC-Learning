import { LightningElement } from 'lwc';

export default class QuickInputTest extends LightningElement {
    myVal = "<strong>Hello!</strong>";

  handleChange(event) {
    this.myVal = event.target.value;
  }
}