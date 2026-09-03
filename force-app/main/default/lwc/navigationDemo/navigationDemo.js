import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class NavigationDemo extends NavigationMixin(LightningElement) {
  async handleNavigateToRecordPage() {
    await this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: "0069H00000H0gIPQAZ",
        objectApiName: "Opportunity",
        actionName: "view"
      }
    });
  }
}
