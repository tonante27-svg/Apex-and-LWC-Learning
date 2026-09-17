import { LightningElement, api, wire } from "lwc";
import getOfferWrapper from "@salesforce/apex/WrapperClassV2.wrapperMethod";

export default class SpecialOfferWrapper extends LightningElement {
  @api recordId;
  contacts = [];
  opportunities = [];
  offer;
  debug;

  get contactList() {
    return this.contacts.map((c) => c.LastName).join(", ");
  }

  @wire(getOfferWrapper, { accountId: "$recordId" })
  wiredOfferWrapper({ data, error }) {
    if (data) {
      this.contacts = data.conList ?? [];
      console.log("===== Contacts >> ", this.contacts.length, this.contacts);
      console.log("===== AccountID >> ", this.recordId);

      this.opportunities = data.oppList ?? [];
      this.offer = data.specialOffer ?? false;
    } else if (error) {
      console.error(error);
    }
  }
}
