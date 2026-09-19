import { LightningElement } from "lwc";

export default class NewOpportunityComponent extends LightningElement {
  handleNext(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("next", {
        detail: {
          showContact: false,
          showAccount: false,
          showOpportunity: false,
          showProducts: true
        }
      })
    );
  }

  handlePrevious(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("previous", {
        detail: {
          showContact: true,
          showAccount: false,
          showOpportunity: false,
          showProducts: false
        }
      })
    );
  }
}
