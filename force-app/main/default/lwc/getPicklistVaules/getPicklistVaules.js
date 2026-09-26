/*. RESUSABLE PICKLIST COMPONENT
<template>
    <lightning-card icon-name="standard:account" variant="base">
      <div class="slds-var-m-around_small">
        <c-get-picklist-vaules object-api-name="Account" field-api-name="Industry" label="Industry" placeholder="Select industry" onvaluechange={handleValueChange}></c-get-picklist-vaules>
    </div>
      <div class="slds-var-m-around_small">
         <c-get-picklist-vaules object-api-name="Account" field-api-name="AccountSource" label="Account Source" placeholder="Select Account Source" onvaluechange={handleValueChange}></c-get-picklist-vaules>
      </div>
      <div class="slds-var-m-around_small">
        <c-get-picklist-vaules object-api-name="Contact" field-api-name="Level__c" label="Level" placeholder="Select Level" onvaluechange={handleValueChange}></c-get-picklist-vaules>
      </div>
     <div class="slds-var-m-around_small">
        <c-get-picklist-vaules object-api-name="Contact" field-api-name="LeadSource" label="LeadSource" placeholder="Select LeadSource" onvaluechange={handleValueChange}></c-get-picklist-vaules>
      </div>
       
    </lightning-card>
</template>
*/

import { LightningElement, wire, api, track } from "lwc";
import {
  getObjectInfo,
  getPicklistValuesByRecordType,
} from "lightning/uiObjectInfoApi";
//import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
//import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetPicklistVaules extends LightningElement {
  selectedValue;
  @api recordTypeId;
  resolvedRecordTypeId;
  @api objectApiName; //= "Account";
  @api fieldApiName; //= "Type";
  @track industryPicklistValues = [];
  @api label; //= 'Type'
  @api placholder; //= "Select Type ...";

  error;

  @wire(getObjectInfo, { objectApiName: "$objectApiName" })
  objectInfoHandler({ data, error }) {
    if (data) {
      this.resolvedRecordTypeId = this.recordTypeId || data.defaultRecordTypeId;
      console.log("=== FIELD API NAME 1 === " + this.fieldApiName);
    } else if (error) {
      this.error = error;
      console.error("===ERROR == ", this.error);
    }
  }
  @wire(getPicklistValuesByRecordType, {
    recordTypeId: "$resolvedRecordTypeId",
    objectApiName: "$objectApiName",
  })
  wirePicklistValues({ data, error }) {
    if (data) {
      /*  TO remeber the returned structure for objAPiName = Account
        data={
          picklistFieldValues:{
            Type: {
              values : []
            },
            Industry: {
              values : []
            },
            AccountSource: {
              values : []
            },
            Rating: {
              values : []
            },
          }
        }
      */
      if (
        data.picklistFieldValues &&
        data.picklistFieldValues[this.fieldApiName]
      ) {
        let picklistValues = data.picklistFieldValues[this.fieldApiName];
        this.industryPicklistValues = picklistValues.values;
        console.log("=== FIELD API NAME 2 === " + this.fieldApiName);
      } else if (error) {
        this.error = error;
        console.error("=== ERROR== ", this.error);
      }
    }
  }

  get options() {
    return this.industryPicklistValues;
  }

  handleChange(event) {
    event.preventDefault();
    this.selectedValue = event.detail ? event.detail.value : event.target.value;
    this.dispatchEvent(
      new CustomEvent("valuechange", {
        detail: {
          fieldApiName: this.fieldApiName,
          value: this.selectedValue,
        },
      }),
    );
  }
}
