import { LightningElement, wire, api } from "lwc";
import getContacts from "@salesforce/apex/AccordionController.getContacts";
export default class TabSetComponent extends LightningElement {
  contactList = [];
  error;
  @api recordId;

  connectedCallback() {
    if (this.recordId) {
      console.log("recordId : ==> " + this.recordId);
    }
  }
  @wire(getContacts)
  wireData({ data, error }) {
    if (data) {
      console.log("This Data \n", data);
      this.contactList = data;
      error = undefined;
    } else if (error) {
      this.contactList = [];
      this.error = error;
      console.log("This Error \n", this.error);
    }
  }

  errorCallback(error, stack) {
    console.log("Error Callback : \n ", error);
    console.log("Stack: \n", stack);
  }
}
