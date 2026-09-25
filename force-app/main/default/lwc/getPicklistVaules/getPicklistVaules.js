import { LightningElement, wire, track } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetPicklistVaules extends LightningElement {
  selectedValue;
  recordTypeId;
  @track industryPicklistValues = [];
  error;

  // 1. Get object info → extract a real Record Type Id
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  objectInfoHandler({ data, error }) {
    if (data) {
      this.recordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      this.error = error;
      console.error("===ERROR == ", this.error);
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$recordTypeId",
    fieldApiName: INDUSTRY_FIELD,
  })
  wirePicklistHandler({ data, error }) {
    if (data) {
      console.log("==picklist values===", data);
      this.industryPicklistValues = data.values;
    }
    if (error) {
      console.error("getPicklistValues error", error);
    }
  }
  // get options() {
  //   return this.industryPicklistValues;
  // }

  // set options(options) {
  //   this.industryPicklistValues = options;
  // }

  handleChange(event) {
    this.selectedValue = event.target.value;
  }
}
