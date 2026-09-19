import { LightningElement } from "lwc";

export default class NewContactComponent extends LightningElement {
  handleNext(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("next", {
        detail: {
          showContact: false,
          showAccount: false,
          showOpportunity: true,
          showProducts: false
        }
      })
    );
  }

  handlePrevious(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("previous", {
        detail: {
          showContact: false,
          showAccount: true,
          showOpportunity: false,
          showProducts: false
        }
      })
    );
  }
}
