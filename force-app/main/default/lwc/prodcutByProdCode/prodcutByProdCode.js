import { LightningElement, wire } from "lwc";
import getProducts from "@salesforce/apex/ProductController.getProductsByCode";
export default class ProdcutByProdCode extends LightningElement {
  products = [];
  error;
  prodCode = "GC1060";

  @wire(getProducts, { productCode: "$prodCode" })
  wireProducts({ data, error }) {
    if (data) {
      this.error = undefined;
      this.products = data;

      console.log("Products:", this.products);
    } else if (error) {
      this.products = undefined;
      this.error = error;

      console.log("Error:", this.error);
    }
  }
}
