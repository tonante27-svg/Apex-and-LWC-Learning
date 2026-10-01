import { LightningElement } from "lwc";
import searchProductModal from "c/searchProduct";
export default class SearchProductContainer extends LightningElement {
  async handleClick() {
    const result = await searchProductModal.open({
      size: "large",
      description: "Search Product Modal",
      label: "Search Product",
      content: "Simple Content from Parent Component",
    });
    console.log("Modal closed with Product result:", result);
  }
}
