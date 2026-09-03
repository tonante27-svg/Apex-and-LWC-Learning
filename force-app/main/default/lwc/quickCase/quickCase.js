import { LightningElement, wire, api } from "lwc";
import {
  getObjectInfo,
  getPicklistValuesByRecordType
} from "lightning/uiObjectInfoApi";

import { createRecord } from "lightning/uiRecordApi";
import CASE_OBJECT from "@salesforce/schema/Case";
import LightningToast from "lightning/toast";

export default class QuickCase extends LightningElement {
  statusOptions = [];
  priorityOptions = [];
  originOptions = [];
  typeOptions = [];

  @api recordId;
  @api objectApiName;
  recordInput;

  // Replace with a real Record Type Id from your org
  // You can find it in Setup → Object Manager → Case → Record Types
  // or by running: SELECT Id, Name FROM RecordType WHERE SObjectType = 'Case'
  // Keep this if you want to track selected values
  fields = {
    Subject: "",
    Status: "",
    Priority: "",
    Origin: "",
    Description: "",
    Type: ""
  };

  recordTypeId;

  @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
  wiredObjectInfo({ data, error }) {
    if (data) {
      this.recordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      console.error(
        "❌ Picklist error with hardcoded RT:",
        JSON.stringify(error)
      );
    }
  }

  @wire(getPicklistValuesByRecordType, {
    objectApiName: CASE_OBJECT,
    recordTypeId: "$recordTypeId" // reactive to the property above
  })
  wiredPicklists({ data, error }) {
    if (data) {
      this.statusOptions = data.picklistFieldValues.Status?.values || [];
      this.priorityOptions = data.picklistFieldValues.Priority?.values || [];
      this.originOptions = data.picklistFieldValues.Origin?.values || [];
      this.typeOptions = data.picklistFieldValues.Type?.values || [];
      console.log("✅ Picklists loaded with hardcoded RT");
    } else if (error) {
      console.error(
        "❌ Picklist error with hardcoded RT:",
        JSON.stringify(error)
      );
    }
  }
  handleInput(event) {
    console.log("Field changed →", event.target.name, event.target.value);

    const name = event.target.name;
    const value = event.target.value;

    this.fields = {
      ...this.fields,
      [name]: value
    };
  }

  async handleCreateCase() {
    // Make sure this.fields always exists
    if (!this.fields) {
      this.fields = {
        Subject: "",
        Status: "",
        Priority: "",
        Origin: "",
        Description: "",
        Type: ""
      };
    }

    // Create a clean copy
    console.log("this.fields →", this.fields);
    const fieldsToCreate = { ...this.fields };

    // Attach the correct parent
    if (this.objectApiName === "Account") {
      fieldsToCreate.AccountId = this.recordId;
    } else if (this.objectApiName === "Contact") {
      fieldsToCreate.ContactId = this.recordId;
    } else {
      console.warn("Unknown objectApiName:", this.objectApiName);
    }

    const recordInput = {
      apiName: CASE_OBJECT.objectApiName,
      fields: fieldsToCreate
    };

    try {
      const caseRecord = await createRecord(recordInput);
      console.log("✅ Case created:", caseRecord.id);
      this.showToast("Success", "Case created successfully!", "success");

      // Optional: clear the form
      this.fields = {
        Subject: "",
        Status: "",
        Priority: "",
        Origin: "",
        Description: "",
        Type: ""
      };
    } catch (error) {
      console.error("❌ Error creating case:", error);
      this.showToast(
        "Error",
        error.body?.message || "Failed to create case.",
        "error"
      );
    }
  }

  async showToast(label, message, variant) {
    LightningToast.show({
      label: label,
      message: message,
      variant: variant
    });
  }
}
