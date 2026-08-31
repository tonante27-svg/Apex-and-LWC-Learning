import { LightningElement, wire } from "lwc";
import getProducts from "@salesforce/apex/ProductController.getProductsByFilters";
export default class ProductByFilter extends LightningElement {
  filteredProducts = [];
  error;
  prodCode = "GC1060";
  prodFamily = "Inverter";

  @wire(getProducts, { productCode: "$prodCode", productFamily: "$prodFamily" })
  wireProducts({ data, error }) {
    if (data) {
      this.error = undefined;
      this.filteredProducts = data;

      console.log("Products", this.filteredProducts);
    } else if (error) {
      this.error = error;
      console.error("Error", this.error);
    }
  }
}
