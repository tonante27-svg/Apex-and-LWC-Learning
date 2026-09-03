import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class Example extends NavigationMixin(LightningElement) {
  async handleNavigateToLightningWebComponent() {
    await this[NavigationMixin.Navigate]({
      type: "standard__component",
      attributes: {
        componentName: "c__details" // Replace with your LWC's name
      },
      state: {
        c__recordId: "0019H00000OyVJIQA3", // Replace with the record ID you want to pass
        c__recordName: "Salesforce.com", // Replace with the object API name you want to pass
        c_counter: 10
      }
    });
  }
}
