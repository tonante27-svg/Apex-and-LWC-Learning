import { LightningElement, api, track } from "lwc";
import Toast from "lightning/toast";

export default class LdsLoadRecord extends LightningElement {
  @api recordId;
  @api objectApiName;
  @track fieldList = ["Name", "Industry", "Rating", "Description", "Active__c"];
  connectedCallback() {
    console.log("Record Id", this.recordId);
    console.log("Object Api Name", this.objectApiName);
  }

  handleSuccess(event) {
    Toast.show({
      label: "Edit Successful.",
      message: "The inputted data was successfully updated.",
      variant: "success"
    });
    console.log(JSON.stringify(event.detail));
  }

  handleError(event) {
    Toast.show({
      label: "The Edit Failed",
      message: "The inputted data failed to update.",
      variant: "error"
    });

    console.error(JSON.stringify(event.detail));
  }
}
