import { LightningElement, api } from "lwc";

export default class SearchComponent extends LightningElement {
  delayTimeout;
  searchKey;
  @api objectApiName;

  get searchLabel() {
    console.log("objectApiName: ", this.objectApiName);
    return this.objectApiName ? `Search ${this.objectApiName}` : "Search";
  }

  handleChange(event) {
    this.searchKey = event.target.value;

    // Clear previous timeout
    window.clearTimeout(this.delayTimeout);

    // Wait 300ms after the user stops typing
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: this.searchKey
        })
      );
    }, 300);
  }
}
