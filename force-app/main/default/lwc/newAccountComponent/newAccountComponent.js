import { LightningElement } from "lwc";

export default class NewAccountComponent extends LightningElement {
  handleNext(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("next", {
        detail: {
          showAccount: false,
          showContact: true,
          showOpportunity: false,
          showProducts: false
        }
      })
    );
  }
}
