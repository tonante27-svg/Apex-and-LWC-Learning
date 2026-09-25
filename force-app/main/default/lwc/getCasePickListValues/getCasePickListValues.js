import { LightningElement, api, wire, track } from "lwc";
import {
  getObjectInfo,
  getPicklistValuesByRecordType,
} from "lightning/uiObjectInfoApi";
import { createRecord } from "lightning/uiRecordApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import ORIGIN_FIELD from "@salesforce/schema/Case.Origin";
import ACCOUNTID_FIELD from "@salesforce/schema/Account.Id";
import CONTACTID_FIELD from "@salesforce/schema/Contact.Id";

import Toast from "lightning/toast";
import CASE_OBJECT from "@salesforce/schema/Case";

export default class GetCasePickListValues extends LightningElement {
  @api recordId;

  @track statusPKValues = [];
  @track priorityPKValues = [];
  @track originPKValues = [];

  error;
  selectedStatusValue;
  selectedPriorityValue;
  selectedOriginValue;
  recordTypeId;

  // 1. Get object info → extract a real Record Type Id
  @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
  recordTypeIdHandler({ data, error }) {
    if (data) {
      this.recordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      this.error = error;
      console.error("===ERROR getObjectInfo === ", this.error);
    }
  }
  @wire(getPicklistValuesByRecordType, {
    objectApiName: CASE_OBJECT,
    recordTypeId: "$recordTypeId",
  })
  wirePicklistHandler({ data, error }) {
    if (data) {
      this.statusPKValues = data.picklistFieldValues.Status.values;
      this.priorityPKValues = data.picklistFieldValues.Priority.values;
      this.originPKValues = data.picklistFieldValues.Origin.values;
    }
    if (error) {
      console.error("=== ERROR getPicklistValues ===", error);
    }
  }

  async handleCreateCase() {
    // 1. Map values using field API names as keys
    const fields = {};
    fields[STATUS_FIELD.fieldApiName] = this.selectedStatusValue;
    fields[PRIORITY_FIELD.fieldApiName] = this.selectedPriorityValue;
    fields[ORIGIN_FIELD.fieldApiName] = this.selectedOriginValue;
    // Dynamically associate AccountId or ContactId based on parent record context
    if (this.recordId) {
      if (this.recordId.startsWith("001")) {
        fields[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
      } else if (this.recordId.startsWith("003")) {
        fields[CONTACTID_FIELD.fieldApiName] = this.recordId;
      }
    }
    // 2. Prepare the recordInput payload
    const recordInput = {
      apiName: CASE_OBJECT.objectApiName,
      fields,
    };
    try {
      const aCase = await createRecord(recordInput);
      console.log("=== CREATD CASE! ===> " + aCase);
      this.handleToast(
        "Successful Record Creation",
        `Case record created successfully with ID: ${aCase.id}`,
        "success",
      );
      this.resetForm();
    } catch (error) {
      this.handleToast(
        "Error on Case Creation ",
        error.body ? error.body.message : error.message,
        "error",
      );
    }
  }
  handleStatusChange(event) {
    this.selectedStatusValue = event.target.value;
  }

  handleOriginChange(event) {
    this.selectedOriginValue = event.target.value;
  }

  handlePriorityChange(event) {
    this.selectedPriorityValue = event.target.value;
  }

  resetForm() {
    this.selectedStatusValue = undefined;
    this.selectedPriorityValue = undefined;
    this.selectedOriginValue = undefined;
  }

  handleToast(someLabel, someMsg, someVariant) {
    Toast.show(
      {
        label: someLabel,
        message: someMsg,
        variant: someVariant,
      },
      this,
    );
  }
}
