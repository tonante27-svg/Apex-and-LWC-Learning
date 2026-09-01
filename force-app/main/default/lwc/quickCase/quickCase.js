import { LightningElement, wire, api } from "lwc";
import {
  getObjectInfo,
  getPicklistValuesByRecordType
} from "lightning/uiObjectInfoApi";
import CASE_OBJECT from "@salesforce/schema/Case";

export default class QuickCase extends LightningElement {
  statusOptions = [];
  priorityOptions = [];
  typeOptions = [];

  // Replace with a real Record Type Id from your org
  // You can find it in Setup → Object Manager → Case → Record Types
  // or by running: SELECT Id, Name FROM RecordType WHERE SObjectType = 'Case'
  // Keep this if you want to track selected values
  fields = {
    Subject: "",
    Status: "",
    Priority: "",
    Type: "",
    Description: ""
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
    this.fields[event.target.name] = event.target.value;
  }
}
