import { LightningElement, wire } from "lwc";
import getContactList from "@salesforce/apex/DataTableController.getContactList";
// This uses LwcApplication.app -  aura: https://agility-drive-9388-dev-ed.scratch.lightning.force.com/c/LwcApplication.app
const columns = [
  {
    label: "Name",
    fieldName: "recordUrl",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "Name"
      },
      target: "_blank"
    },
    cellAttributes: {
      iconName: {
        fieldName: "contactIcon"
      },
      iconPosition: "left",
      iconAlternativeText: "Contact Icon"
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Title", fieldName: "Title", type: "text" },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "AccountId", fieldName: "AccountId", type: "text" },
  {
    label: "Account Name",
    fieldName: "accountUrl",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "AccountName"
      },
      target: "_blank"
    },
    cellAttributes: {
      iconName: {
        fieldName: "accountIcon"
      },
      iconPosition: "right",
      iconAlternativeText: "Account Icon"
    }
  }
];

export default class DatatableComponent extends LightningElement {
  contactData;
  columnList = columns;
  error;
  @wire(getContactList)
  wireData(data, error) {
    if (data) {
      let parsedData = JSON.parse(JSON.stringify(data));
      let baseUrl = window.location.origin + "/";
      parsedData.forEach((contact) => {
        contact.recordUrl = baseUrl + contact.Id;
        if (contact.AccountId) {
          contact.AccountName = contact.Account.Name; // Change the column name from AccountName to ACCOUNT_NAME in columns first  before you add this coe.
          contact.accountUrl = baseUrl + contact.AccountId;
          contact.accountIcon = "standard:account";
          contact.contactIcon = "standard:contact";
        }
      });
      this.error = undefined;
      this.contactData = parsedData;
    } else if (error) {
      this.error = error;
      this.contactData = undefined;
    }
  }
}
