import { LightningElement } from "lwc";
import getFilteredAccounts from "@salesforce/apex/AccountController.getFilteredAccounts";
export default class AccountFilteredList extends LightningElement {
  error;
  accounts;
  industryType = "Education";

  isLoading = false;

  async handleSearch() {
    this.isLoading = true;
    try {
      const result = await getFilteredAccounts({ industry: this.industryType });
      if (result) {
        this.accounts = result;
        this.error = undefined;
      }
    } catch (error) {
      this.error = error;
      console.error("Error getting record", error);
    }
  }
}
