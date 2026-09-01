import { LightningElement, api } from "lwc";
import { createRecord, deleteRecord } from "lightning/uiRecordApi";
import Toast from "lightning/toast";

export default class CreateAccountRecord extends LightningElement {
  @api recordId;
  @api objectApiName;
  fields = {
    Name: "",
    AnnualRevenue: "",
    Industry: "",
    Rating: "",
    Type: ""
  };
  isLoading = false;

  recordToDelete = "0019H00000OxrtpQAB";

  industryOptions = [
    { label: "Apparel", value: "Apparel" },
    { label: "Banking", value: "Banking" },
    { label: "Biotechnology", value: "Biotechnology" },
    { label: "Chemicals", value: "Chemicals" },
    { label: "Communications", value: "Communications" },
    { label: "Apparel", value: "Apparel" },
    { label: "Construction", value: "Construction" },
    { label: "Consulting", value: "Consulting" },
    { label: "Education", value: "Education" },
    { label: "Electronics", value: "Electronics" },
    { label: "Energy", value: "Energy" },
    { label: "Engineering", value: "Engineering" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Environmental", value: "Environmental" },
    { label: "Finance", value: "Finance" },
    { label: "Food & Beverage", value: "Food & Beverage" },
    { label: "Government", value: "Government" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Insurance", value: "Insurance" },
    { label: "Machinery", value: "Machinery" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Media", value: "Media" },
    { label: "Not For Profit", value: "Not For Profit" },
    { label: "Recreation", value: "Recreation" },
    { label: "Retail", value: "Retail" },
    { label: "Shipping", value: "Shipping" },
    { label: "Technology", value: "Technology" },
    { label: "Telecommunications", value: "Telecommunications" },
    { label: "Transportation", value: "Transportation" },
    { label: "Utilities", value: "Utilities" },
    { label: "Other", value: "Other" }
  ];

  ratingOptions = [
    { label: "Hot", value: "Hot" },
    { label: "Warm", value: "Warm" },
    { label: "Cold", value: "Cold" }
  ];

  typeOptions = [
    { label: "Prospect", value: "Prospect" },
    { label: "Customer - Direct", value: "Customer - Direct" },
    {
      label: "Channel Partner / Reseller",
      value: "Channel Partner / Reseller"
    },
    { label: "Installation Partner", value: "Installation Partner" },
    { label: "Technology Partner", value: "Technology Partner" },
    { label: "Other", value: "Other" }
  ];

  handleInput(event) {
    const fieldName = event.target.dataset.id;
    const value = event.target.value;

    this.fields[fieldName] = value;
  }
  async handleCreateRecord() {
    const recordInput = {
      apiName: this.objectApiName,
      fields: this.fields
    };
    try {
      const createdRecord = await createRecord(recordInput);

      Toast.show(
        {
          label: "Creation Success",
          message: `Record created with ID: ${createdRecord.id}`,
          variant: "success"
        },
        this
      );
      this.resetFields();
    } catch (error) {
      Toast.show({
        label: "Creation Failed",
        message: error.body?.message || error.message,
        variant: "error"
      });
    }
  }
  resetFields() {
    this.fields = {
      Name: "",
      AnnualRevenue: "",
      Industry: "",
      Rating: "",
      Description: ""
    };
  }

  async handleDeleteRecord(event) {
    event.preventDefault();
    this.isLoading = true;

    try {
      await deleteRecord(this.recordToDelete);

      Toast.show(
        {
          label: "Creation Success",
          message: `Record deleted formerly with ID: ${this.recordToDelete}`,
          variant: "success"
        },
        this
      );
    } catch (error) {
      Toast.show(
        {
          label: "Deletion Failed",
          message: error.body?.message || error.message,
          variant: "error"
        },
        this
      );
    }
  }
}
