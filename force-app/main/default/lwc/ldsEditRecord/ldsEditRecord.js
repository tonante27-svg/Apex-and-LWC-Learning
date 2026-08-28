import { LightningElement, api } from "lwc";
import Toast from "lightning/toast";
export default class LdsEditRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  handleSuccess(event) {
    Toast.show({
      label: "Successful Data Edit",
      message: "The data edit was successful.",
      variant: "success"
    });
    console.log("Successful", JSON.stringify(event.detail));
  }

  handleError(event) {
    Toast.show({
      label: "Failed Data Edit",
      message: "The data edit failed.",
      variant: "error"
    });
    console.error("Failed", JSON.stringify(event.detail));
  }
}
