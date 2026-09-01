import { LightningElement, api } from "lwc";
import { updateRecord } from "lightning/uiRecordApi";
import Toast from "lightning/toast";

export default class LdsUpdateRecord extends LightningElement {
  @api recordId;
  @api objectApiName;
  description;

  async handleUpdate(event) {
    event.preventDefault();
    this.isLoading = true;
    const fields = {
      Id: "$recordId",
      Description: this.description,
      Active__c: "Yes",
      AnnualRevenue: 2000000
      //fields[TYPE_FIELD.fieldApiName] = '' - Is another way if you want o import the Object schema fields.
    };
    try {
      const recordInput = { fields };

      const updatedRecord = await updateRecord(recordInput);
      this.dispatchEvent(
        Toast.show({
          label: "Successful Update",
          message: `Record update successfully with ID: ${updatedRecord.Id}`,
          variant: "success"
        })
      );
    } catch (error) {
      this.dispatchEvent(
        Toast.show({
          label: "Update Failed",
          message: `Record NOT updated with ID: ${updatedRecord.Id} and error: ${error.body.message}`,
          variant: "error"
        })
      );
    } finally {
      // This executes whether updateRecord succeeds OR fails
      this.isLoading = false;
    }
  }

  handleInputChange(event) {
    this.description = event.target.value;
  }
}
