import { LightningElement, wire } from "lwc";
import getContactList from "@salesforce/apex/DataTableController.getContactList";

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Title", fieldName: "Title", type: "text" },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "AccountId", fieldName: "AccountId", type: "text" },
  { label: "Account Name", fieldName: "AccountName", type: "text" }
];

export default class DataTableComponent extends LightningElement {
  contactData;
  error;
  columnList = columns;

  @wire(getContactList)
  wireData({ data, error }) {
    if (data) {
      this.contactData = data.map((contact) => ({
        ...contact,
        AccountName: contact.Account ? contact.Account.Name : ""
      }));
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.contactData = undefined;
    }
  }
}
