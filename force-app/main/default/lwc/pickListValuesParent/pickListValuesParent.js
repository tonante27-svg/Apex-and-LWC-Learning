import { LightningElement } from "lwc";

export default class PickListValuesParent extends LightningElement {
  value;
  fieldApiName;

  handleValueChange(event) {
    //event.preventDefault();
    this.fieldApiName = event.detail.fieldApiName;
    this.value = event.detail.value;
    console.log(JSON.stringify(event.detail));
    console.log(`The field api name is:  ${this.fieldApiName}`);
    console.log(`The value is:  ${this.value}`);
  }
}
