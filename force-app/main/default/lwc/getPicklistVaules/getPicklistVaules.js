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
      /*  TO remeber the reutned structure
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
      } else if (error) {
        this.error = error;
        console.error("=== ERROR== ", this.error);
      }
    }
  }
  //The follwoing have been commented out since they are for the static solution
  // 1. Get object info → extract a real Record Type Id
  // @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  // objectInfoHandler({ data, error }) {
  //   if (data) {
  //     this.recordTypeId = data.defaultRecordTypeId;
  //   } else if (error) {
  //     this.error = error;
  //     console.error("===ERROR == ", this.error);
  //   }
  // }

  // @wire(getPicklistValues, {
  //   recordTypeId: "$recordTypeId",
  //   fieldApiName: INDUSTRY_FIELD,
  // })
  // wirePicklistHandler({ data, error }) {
  //   if (data) {
  //     console.log("==picklist values===", data);
  //     this.industryPicklistValues = data.values;
  //   }
  //   if (error) {
  //     console.error("getPicklistValues error", error);
  //   }
  // }

  get options() {
    return this.industryPicklistValues;
  }

  handleChange(event) {
    this.selectedValue = event.target.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          fieldApiName: this.fieldApiName,
          value: this.selectedValue,
        },
      }),
    );
  }
}
