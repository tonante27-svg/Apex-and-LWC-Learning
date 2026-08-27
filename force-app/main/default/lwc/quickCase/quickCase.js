import { LightningElement, wire } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import CASE_OBJECT from "@salesforce/schema/Case";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import NAME_FIELD from "@salesforce/schema/Contact.Name";

export default class QuickCase extends LightningElement {
  statusOptions = [];
  priorityOptions = [];

  @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
  objectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: STATUS_FIELD
  })
  wiredStatusPicklist({ data }) {
    if (data) {
      this.statusOptions = data.values;
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: PRIORITY_FIELD
  })
  wiredPriorityicklist({ data }) {
    if (data) {
      this.priorityOptions = data.values;
    }
  }

  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
  objectContactInfo;

  handleOnready() {
    this.refs.recordPicker.focus();
  }
}
