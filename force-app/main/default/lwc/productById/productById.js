import { LightningElement, wire } from "lwc";
import getOneProduct from "@salesforce/apex/ProductController.getProductById";
export default class ProductById extends LightningElement {
  recordId;
  product;
  error;

  @wire(getOneProduct, { productId: "$recordId" })
  wiredProduct({ data, error }) {
    if (data) {
      this.error = undefined;
      this.product = data;
    } else if (error) {
      this.product = undefined;
      this.error = error;
    }
  }
  connectedCallback() {
    this.recordId = "01t9H000008Fg91QAC";
  }
}
