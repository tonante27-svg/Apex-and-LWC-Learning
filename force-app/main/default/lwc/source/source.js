import { LightningElement, wire } from "lwc";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
// This example isgood for when an LWCin one UI page needs to navigate to another LWC in a different UI page and pass parameters to it.
//  The receiving LWC can then access those parameters using the CurrentPageReference wire adapter.
// Usage: Experience Cloud is a good use case for this example, where one LWC in a page needs to navigate to another LWC in a different page and pass parameters to it. The receiving LWC can then access those parameters using the CurrentPageReference wire adapter.
export default class Example extends NavigationMixin(LightningElement) {
  @wire(CurrentPageReference)
  pageRef;

  connectedCallback() {
    // Access the state parameters from the URL
    // const recordId = this.pageRef?.state?.c__recordId;
    // const recordName = this.pageRef?.state?.c__recordName;
    // const counter = this.pageRef?.state?.c_counter;

    // console.log("Record ID:", recordId);
    // console.log("Record Name:", recordName);
    // console.log("Counter:", counter);
    console.log("Current Page Reference:", JSON.stringify(this.pageRef));
  }

  async handleNavigateToLightningWebComponent() {
    await this[NavigationMixin.Navigate]({
      type: "standard__component",
      attributes: {
        componentName: "c__details" // Replace with your LWC's name
      },
      state: {
        c__recordId: "0019H00000OyVJIQA3", // Replace with the record ID you want to pass
        c__recordName: "Salesforce.com", // Replace with the object API name you want to pass
        c__counter: 10
      }
    });
  }
}
