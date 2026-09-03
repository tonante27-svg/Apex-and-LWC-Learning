import { LightningElement, wire } from "lwc";
import getLatestAccounts from "@salesforce/apex/AccountController.getAccountList";
import updateAccount from "@salesforce/apex/AccountController.updateAccount";
import { deleteRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";

const columns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "text" },
  { label: "Industry", fieldName: "Industry", type: "text" }
];

export default class LwcRefreshApex extends LightningElement {
  cols = columns;
  selectRecord;
  accountList = [];
  error;
  wiredAccountList;

  @wire(getLatestAccounts)
  wiredAccountResults(result) {
    this.wiredAccountList = result;

    if (result.data) {
      this.accountList = result.data; // Save the whole results in this array.
      this.error = undefined;

      console.log("Account List", this.wiredAccountList);
    } else if (result.error) {
      this.error = result.error;
      this.accountList = [];

      console.log("Error", result.error);
    }
  }
  //handleSelection selects the checkbox on the record that needs to be deleted by deleteRecord ()
  handleSelection(event) {
    if (event.detail.selectedRows.length > 0) {
      this.selectRecord = event.detail.selectedRows[0].Id;
    }
  }

  async deleteRecord() {
    try {
      await deleteRecord(this.selectRecord);

      await refreshApex(this.wiredAccountList);
    } catch (error) {
      console.error("Error deleting record", error);
    }
  }

  async updateRecord() {
    try {
      console.log("Selected Record:", this.selectRecord);

      await updateAccount({ recordId: this.selectRecord });

      await refreshApex(this.wiredAccountList);
    } catch (error) {
      console.error("Error updating record", error);
    }
  }
}
