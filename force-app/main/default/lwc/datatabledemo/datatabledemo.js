import { LightningElement, wire, track } from "lwc";
import ListAccounts from "@salesforce/apex/AccountService.listAccounts";
const columns = [
  { label: "Name", fieldName: "Name" },
  {
    label: "Industry",
    fieldName: "Industry",
    type: "picklist",
    wrapText: true,
    typeAttribute: {
      name: "Industry",
      label: "Industry",
      placeholder: "Select Industry",
      options: [
        { label: "Education", value: "Education" },
        { label: "Technology", value: "Technology" },
        { label: "Banking", value: "Banking" },
        { label: "Chemical", value: "Chemical" },
        { label: "Apparel", value: "Apparel" },
        { label: "IT", value: "IT" },
      ],
      variant: "label-hidden",
    },
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Type", fieldName: "Type" },
];
export default class Datatabledemo extends LightningElement {
  @track columnList = columns;
  @track records;
  @track errors;

  @wire(ListAccounts)
  wireAccounts({ data, error }) {
    if (data) {
      this.error = undefined;
      this.records = data;
    }
    if (error) {
      this.errors = error;
    }
  }
}
