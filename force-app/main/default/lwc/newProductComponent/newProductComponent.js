import { LightningElement } from "lwc";

export default class NewProductComponent extends LightningElement {
  handlePrevious(event) {
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
}
