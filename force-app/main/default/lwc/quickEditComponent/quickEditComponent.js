// quickEditComponent is Called By : CloseCase LWC
import { LightningElement, api, track, wire } from "lwc";
import getMetadataObjectRecords from "@salesforce/apex/MetadataRetreiver.getMetadataObjectRecords";
export default class QuickEditComponent extends LightningElement {
  @api recordId;
  @api objectApiName;
  @track fieldsToEdit = []; // Dynamic fields from different objects
  @api placeToBeUsed;
  length;

  @wire(getMetadataObjectRecords, {
    objectApiName: "$objectApiName",
    placeToBeUsed: "$placeToBeUsed",
    usedFor: "Edit Record",
  })
  wireMetadataRecords({ data, error }) {
    console.log("EDIT WIRE FIRED", data, error);
    if (data) {
      console.log("EDIT METADATA ==>", data);
      this.fieldsToEdit = data.map((field) => {
        return {
          objectApiName: field.ObjectAPIName__r.QualifiedApiName,
          fieldApiName: field.FieldAPIName__r.QualifiedApiName,
        };
      });
    }

    if (error) {
      console.error(
        `Error while retrieving the Custom metadata records`,
        error,
      );
    }
  }
  connectedCallback() {
    console.log("EDIT COMPONENT LOADED");
  }

  handleSuccess() {}
  handleError() {}
}
