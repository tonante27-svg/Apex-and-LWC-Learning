import { LightningElement, api, track } from "lwc";

export default class CloseCase extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api placeToBeUsed;

  @track fieldsToEdit = [];

  showCloseCaseComponent = false;

  handleClose() {
    this.showCloseCaseComponent = true;
  }
}
