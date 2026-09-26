import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class FlowComponent extends NavigationMixin(LightningElement) {
  flowName = "Quick_Action";
  recordId;

  handleStatusChange(event) {
    let details = event.detail;
    if (details.status === "FINISHED") {
      let outputVariables = details.outputVariables;
      if (outputVariables) {
        let accountId = outputVariables[0].value;
        console.log(accountId);
        // View a custom object record.
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: accountId,
            //objectApiName: "namespace__ObjectName", // objectApiName is optional
            actionName: "view",
          },
        });
      }
    }
    console.log(JSON.stringify(details));
  }

  get inputVariables() {
    return [
      {
        //match the input varible name that is declared in the this.flowName.
        name: "accountId",
        type: "String",
        //Initial value to send to the flow input
        value: "Value from LWC",
      },
    ];
  }
}
