import { LightningElement, wire } from "lwc";
import getProducts from "@salesforce/apex/ProductController.getProducts";

export default class ProductList extends LightningElement {
  products = [];
  error;

  @wire(getProducts)
  wiredProducts({ data, error }) {
    if (data) {
      this.products = data;
      this.error = undefined;

      console.log("Products:", this.products);
    } else if (error) {
      this.products = [];
      this.error = error;

      console.error("Error:", this.error);
    }
  }
}
