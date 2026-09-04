import { LightningElement, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
export default class Details extends LightningElement {
  @wire(CurrentPageReference) pageRef;

  labels = {
    recordId: "Record ID",
    recordName: "Record Name",
    counter: "Counter"
  };
  connectedCallback() {
    // Access the state parameters from the URL
    this.labels.recordId = this.pageRef?.state?.c__recordId;
    this.labels.recordName = this.pageRef?.state?.c__recordName;
    this.labels.counter = this.pageRef?.state?.c__counter;

    // console.log("Record ID:", recordId);
    // console.log("Record Name:", recordName);
    // console.log("Counter:", counter);
    console.log(
      "Page Reference inside details is:",
      JSON.stringify(this.pageRef)
    );
  }
}
