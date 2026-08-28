import { LightningElement, api, track } from "lwc";
import Toast from "lightning/toast";
export default class LdsCreateRecord extends LightningElement {
  @api objectApiName;
  @track fieldList = [];

  connectedCallback() {
    this.fieldList = [
      "Active__c",
      "Name",
      "Industry",
      "AnnualRevenue",
      "Rating",
      "Descirption",
      "Phone",
      "Type"
    ];
  }

  handleSuccess(event) {
    Toast.show({
      label: "Account created.",
      message: "Record ID:" + event.detail.id,
      variant: "success"
    });

    console.error(JSON.stringify(event.detail.fields));
  }
  handleError(event) {
    console.error(JSON.stringify(event.detail));
    Toast.show({
      label: "Account created.",
      message: "Account creeation failed ",
      variant: "error"
    });
  }
  handleSubmit(event) {
    event.preventDefult(); //Write out own behavior. do not use browser default.
    let fields = event.detail.fields;
    fields.Description = "This is updated from the LDS JS";
    this.refs.createform.submit(fields);
  }
}
