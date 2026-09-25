import { LightningElement, api, wire, track } from "lwc";
import {
  getObjectInfo,
  getPicklistValuesByRecordType,
} from "lightning/uiObjectInfoApi";
import { createRecord } from "lightning/uiRecordApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import ORIGIN_FIELD from "@salesforce/schema/Case.Origin";
import SUBJECT_FIELD from "@salesforce/schema/Case.Subject";
import ACCOUNTID_FIELD from "@salesforce/schema/Case.AccountId";
import CONTACTID_FIELD from "@salesforce/schema/Case.ContactId";

import Toast from "lightning/toast";
import CASE_OBJECT from "@salesforce/schema/Case";

export default class GetCasePickListValues extends LightningElement {
  @api recordId;

  @track statusPKValues = [];
  @track priorityPKValues = [];
  @track originPKValues = [];

  error;
  caseSubjectValue;
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
    if (
      !this.selectedStatusValue ||
      !this.selectedOriginValue ||
      !this.selectedPriorityValue
    ) {
      this.handleToast(
        "Validation Error",
        "Please select Status, Origin, and Priority.",
        "warning",
      );
      return;
    }
    // 1. Map values using field API names as keys
    const fields = {};
    fields[SUBJECT_FIELD.fieldApiName] = this.caseSubjectValue;
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
    //Check sanity of recordID and fields
    console.log("=== RECORD ID ===", this.recordId);
    console.log("=== PAYLOAD FIELDS ===", JSON.stringify(fields));
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
      // Extracts exact field-level errors or top-level page errors
      const errorMessage =
        error.body?.message ||
        error.body?.output?.errors?.[0]?.message ||
        error.message ||
        "Unknown error occurred";
      //call Toast error handler
      console.error("======= ERROR MESSAGE ====", errorMessage);
      console.error(
        "=== FIELD ERRORS ===",
        JSON.stringify(error.body?.output?.fieldErrors),
      );
      console.error(
        "=== PAGE ERRORS ===",
        JSON.stringify(error.body?.output?.errors),
      );
      this.handleToast("Error Creating Case", errorMessage, "error");
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

  handleSubjectChange(event) {
    this.caseSubjectValue = event.target.value;
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
