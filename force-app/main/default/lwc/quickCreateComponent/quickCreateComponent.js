import { LightningElement, track, api } from "lwc";
//import getMetadataRecords from "@salesforce/apex/MetadataRetreiver.getMetadataRecords";
export default class QuickCreateComponent extends LightningElement {
  //@wire(getMetadataRecords) metadataRecords;
  @api objectApiName = "Case";
  @api placeToBeUsed = "Case Record Page";

  @track fieldsToCreate = ["Subject", "Status", "Description"];
  /*
@track fieldsToCreate = [
{objectName: "Case", fieldName: "Subject"},
{objectName: "Case", fieldName: "Status"},
{objectName: "Case", fieldName: "Description"}    
];
*/
  comnnectedCallback() {
    console.log("objectApiName", this.objectApiName);
    console.log("placeToBeUsed", this.placeToBeUsed);
  }
  handlerSuccess(event) {
    console.log("onsuccess event recordEditForm", event.detail.id);
    console.log("NEW VERSION OF COMPONENT");
  }

  handlerError(event) {
    console.log("onerror event recordEditForm", event.detail);
  }

  handlerSubmit(event) {
    console.log("onsubmit event recordEditForm", event.detail.fields);
  }
}
