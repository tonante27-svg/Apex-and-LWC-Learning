import { LightningElement, wire, track, api } from "lwc";
import getMetadataRecords from "@salesforce/apex/MetadataRetreiver.getMetadataObjectRecords";
import Toast from "lightning/toast";
export default class QuickCreateComponent extends LightningElement {
  //@wire(getMetadataRecords) metadataRecords;
  @api objApiName = "Case";
  @api placeToBeUsed = "Case Record Page";
  length;
  // @track fieldsToCreate = ["Subject", "Status", "Description"];

  @track fieldsToCreate = [
    { objectApiName: "Case", fieldApiName: "Subject" },
    { objectApiName: "Case", fieldApiName: "Status" },
    { objectApiName: "Case", fieldApiName: "Description" },
  ];

  connectedCallback() {
    console.log("objectApiName", this.objApiName);
    console.log("placeToBeUsed", this.placeToBeUsed);
  }

  @wire(getMetadataRecords, {
    objectApiName: "$objApiName",
    placeToBeUsed: "$placeToBeUsed",
  })
  wireMetadataRecords({ data, error }) {
    if (data) {
      console.log("Metadata ==>", data);
      this.fieldsToCreate = data.map((field) => {
        return {
          objectApiName: field.ObjectAPIName__r.QualifiedApiName,
          fieldApiName: field.FieldAPIName__r.QualifiedApiName,
        };
      });
      if (this.fieldsToCreate.length && this.fieldsToCreate.length > 0) {
        this.length = this.fieldsToCreate.length;
      } else {
        this.length = 0;
      }
      console.log(this.fieldsToCreate.length);
    }

    if (error) {
      console.error(
        `Error while retrieving the Custom metadata records`,
        error,
      );
    }
  }
  handlerSuccess(event) {
    console.log("onsuccess event recordEditForm", event.detail.id);
    console.log(`Success. `, JSON.stringify(event.detail));
    Toast.show(
      {
        label: "Success",
        message: "The record was created!",
        variant: "success",
        // use default mode
      },
      this,
    );
  }

  handlerError(event) {
    console.log("onerror event recordEditForm", event.detail);
    console.log(`Error. `, JSON.stringify(event.detail));
    Toast.show(
      {
        label: event.detail.message,
        message: event.detail.detail,
        variant: "error",
        // use default mode
      },
      this,
    );
  }

  handlerSubmit(event) {
    console.log("onsubmit event recordEditForm", event.detail.fields);
  }
}
