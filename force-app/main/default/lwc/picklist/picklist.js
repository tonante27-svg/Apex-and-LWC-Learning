import { LightningElement, wire, track } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class Picklist extends LightningElement {
  value;
  recordTypeId;
  @track industryPicklistValues = [];

  // 1. Get object info → extract a real Record Type Id
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  objectInfoHandler({ data, error }) {
    if (data) {
      // Option A: use the org/user default Record Type
      this.recordTypeId = data.defaultRecordTypeId;

      // Option B: pick a specific Record Type by DeveloperName or Name
      // const rtInfos = data.recordTypeInfos;
      // this.recordTypeId = Object.keys(rtInfos).find(
      //     id => rtInfos[id].name === 'Your Record Type Name'
      // );
    }
    if (error) {
      console.error("getObjectInfo error", error);
    }
  } //Object wire

  @wire(getPicklistValues, {
    recordTypeId: "$recordTypeId",
    fieldApiName: INDUSTRY_FIELD,
  })
  wirePicklistHandler({ data, error }) {
    if (data) {
      console.log("picklist values ", data);
      this.options = data.values;
    }
    if (error) {
      console.error("getPicklistValues error", error);
    }
  }
  get options() {
    return this.industryPicklistValues;
  }

  set options(options) {
    this.industryPicklistValues = options;
  }

  handleChange(event) {
    this.value = event.target.value;
  }
}
