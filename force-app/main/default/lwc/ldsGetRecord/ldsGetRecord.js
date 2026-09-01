import { LightningElement, wire, api } from "lwc";
import {
  getRecord,
  getFieldValue,
  getFieldDisplayValue
} from "lightning/uiRecordApi";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import OWNER_NAME_FIELD from "@salesforce/schema/Account.Owner.Name";
import ANNUAL_REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";

export default class LdsGetRecord extends LightningElement {
  @api recordId;
  @api objectApiName;
  error;
  account;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, INDUSTRY_FIELD, ANNUAL_REVENUE_FIELD],
    optionalFields: [OWNER_NAME_FIELD]
  })
  wiredAccount({ data, error }) {
    if (data) {
      this.error = undefined;
      this.account = data;
    } else if (error) {
      this.error = error;
      console.error(this.error);
    }
  }

  get accountName() {
    return getFieldValue(this.account, NAME_FIELD);
  }

  get industry() {
    return getFieldValue(this.account, INDUSTRY_FIELD);
  }

  get ownerName() {
    return getFieldValue(this.account, OWNER_NAME_FIELD);
  }

  get annualRevenue() {
    return getFieldDisplayValue(this.account, ANNUAL_REVENUE_FIELD);
  }
}
