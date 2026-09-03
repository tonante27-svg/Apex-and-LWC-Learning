import { LightningElement, api, track } from "lwc";
import searchRecords from "@salesforce/apex/LookupControllerLWC.searchRecords";
// Almost there: Check out Amit's solution at : https://gist.github.com/amitastreait/2294aaa3e563aa3306b9cf29a365238a
export default class CustomLookup extends LightningElement {
  @api objectApiName;
  @api fieldApiName;
  @api iconName;
  @track results = [];
  error;
  selectedRecord;

  async handleSearch(event) {
    const searchKey = event.detail;

    //check validty of search key
    if (!searchKey || searchKey.length < 2) {
      this.results = [];
      return;
    }

    try {
      this.results = await searchRecords({
        searchKey: searchKey,
        objectApiName: this.objectApiName,
        fieldApiName: this.fieldApiName
      });
      this.error = undefined;
      console.log("Records found:", this.results);
      // You need to dynamically allow different fieds to be added.
    } catch (error) {
      this.error = error;
      this.results = [];
      console.error("Error searching records:", error);
    }
  }

  handleSelect(event) {
    const id = event.currentTarget.dataset.id;

    const name = event.currentTarget.dataset.name;

    // Change this to what Amit had.
    this.selectedRecord = { Id: id, Name: name };

    // Hide the results list
    this.results = [];

    this.dispatchEvent(
      new CustomEvent("recordselect", {
        // or "select"
        detail: {
          id: id,
          name: name
        }
      })
    );
  }

  handleClear() {
    this.selectedRecord = undefined;
    this.error = undefined;
  }

  get isAccount() {
    return this.objectApiName === "Account";
  }

  get isContact() {
    return this.objectApiName === "Contact";
  }

  handleAccountSelect(event) {
    this.fields.AccountId = event.detail.id;
  }

  handleContactSelect(event) {
    this.fields.ContactId = event.detail.id;
  }
}
