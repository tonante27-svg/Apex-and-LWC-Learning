import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/AccordionController.getContacts";
export default class AccordionComponent extends LightningElement {
  contactList;
  error;
  @wire(getContacts)
  wireData({ data, error }) {
    if (data) {
      this.error = undefined;
      this.contactList = data;
      console.log(`Contact log ===> ${this.contactList}`);
    } else if (error) {
      this.error = error;
      this.contactList = undefined;
      console.log(`Error, contact list is undefined: ${this.error}`);
    }
  }
}
