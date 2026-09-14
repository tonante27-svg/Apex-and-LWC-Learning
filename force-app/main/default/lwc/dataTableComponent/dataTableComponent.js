import { LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import getContactList from "@salesforce/apex/DataTableController.getContactList";
import Toast from "lightning/toast";
import { deleteRecord } from "lightning/uiRecordApi";
//define row actions
const actions = [
  { label: "Show Details", name: "view" },
  { label: "Delete", name: "delete" }
];
const columns = [
  {
    label: "Name",
    fieldName: "recordUrl",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "Name"
      },
      target: "_blank"
    },
    cellAttributes: {
      iconName: {
        fieldName: "contactIcon"
      },
      iconPosition: "left",
      iconAlternativeText: "Contact Icon"
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Title", fieldName: "Title", type: "text" },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "AccountId", fieldName: "AccountId", type: "text" },
  {
    label: "Account Name",
    fieldName: "accountUrl",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "AccountName"
      },
      target: "_blank"
    },
    cellAttributes: {
      iconName: {
        fieldName: "accountIcon"
      },
      iconPosition: "right",
      iconAlternativeText: "Account Icon"
    }
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions,
      menuAlignment: "right"
    }
  }
];

export default class DatatableComponent extends NavigationMixin(
  LightningElement
) {
  contactData;
  columnList = columns;
  error;
  showLoadingSpinner = false;
  refreshTable;

  @wire(getContactList)
  wireData({ data, error }) {
    if (data) {
      let parsedData = JSON.parse(JSON.stringify(data));
      this.refreshTable = parsedData;
      let baseUrl = window.location.origin + "/";
      parsedData.forEach((contact) => {
        contact.recordUrl = baseUrl + contact.Id;
        if (contact.AccountId) {
          contact.AccountName = contact.Account.Name; // Change the column name from AccountName to ACCOUNT_NAME in columns first  before you add this coe.
          contact.accountUrl = baseUrl + contact.AccountId;
          contact.accountIcon = "standard:account";
          contact.contactIcon = "standard:contact";
        }
      });
      this.error = undefined;
      this.contactData = parsedData;
    } else if (error) {
      this.error = error;
      this.contactData = undefined;
    }
  }

  handleRowLevelAction(event) {
    const row = event?.detail?.row;
    const rowId = row?.Id;
    const rowActionName = event?.detail?.action?.name;

    if (!rowId || !rowActionName) {
      return;
    }
    console.log(rowActionName);
    switch (rowActionName) {
      case "view":
        console.log(rowId);
        try {
          this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: rowId,
              objectApiName: "Contact",
              actionName: "view"
            }
          });
        } catch (e) {
          // Fallback in case Lightning navigation is blocked in the current context
          window.location.href = `/lightning/r/Contact/${rowId}/view`;
        }
        break;

      case "delete":
        this.showLoadingSpinner = true;
        deleteRecord(rowId)
          .then(() => {
            this.showLoadingSpinner = false;
            this.handleToast(
              "Success",
              "Contact deleted successfully",
              "success"
            );
            return refreshApex(this.refreshTable);
          })
          .catch((error) => {
            this.showLoadingSpinner = false;
            this.handleToast(
              "Error while deleting record",
              error.body?.message || error.message || "Unknown error",
              "error"
            );
          });
        break;
      default:
        console.warn(`Unhandled row action: ${rowActionName}`);
        break;
    }
  }

  handleToast(t_title, t_message, t_variant) {
    Toast.show(
      {
        label: t_title,
        message: t_message,
        variant: t_variant
      },
      this
    );
  }
}
