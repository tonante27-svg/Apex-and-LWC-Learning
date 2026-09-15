import { LightningElement, wire, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import getContactList from "@salesforce/apex/DataTableController.getContactList";
import Toast from "lightning/toast";
import { deleteRecord, updateRecord } from "lightning/uiRecordApi";
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
  {
    label: "Phone",
    fieldName: "Phone",
    type: "phone",
    sortable: true,
    editable: true
  },
  {
    label: "Title",
    fieldName: "Title",
    type: "text",
    sortable: true,
    editable: true
  },
  { label: "Email", fieldName: "Email", type: "email", sortable: true },
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
//============== Class
export default class DatatableComponent extends NavigationMixin(
  LightningElement
) {
  contactData;
  columnList = columns;
  error;
  showLoadingSpinner = false;
  refreshTable;
  /* Attributes for Data Sorting */
  selectedRows = [];
  sortBy = "Phone";
  sortDirection = "asc";
  draftValues; // List of all fields which have been modified
  refreshApexData;

  @wire(getContactList)
  wireData(result) {
    this.refreshApexData = result;
    if (result.data) {
      let parsedData = JSON.parse(JSON.stringify(result.data));
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
    } else if (result.error) {
      this.error = result.error;
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

  handleSortData(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(event.detail.fieldName, event.detail.sortDirection);
  }
  sortData(fieldName, direction) {
    const parseData = [...this.contactData];
    const isReverse = direction === "asc" ? 1 : -1;

    parseData.sort((a, b) => {
      const x = (a[fieldName] ?? "").toString().toLowerCase();
      const y = (b[fieldName] ?? "").toString().toLowerCase();

      if (x < y) return -1 * isReverse;
      if (x > y) return 1 * isReverse;
      return 0;
    });

    this.contactData = parseData;
  }

  handleSave(event) {
    this.draftValues = event.detail.draftValues;
    const recordInputs = event.detail.draftValues.slice().map((draft) => {
      console.log("this.draftValues \n", this.draftValues);
      const fields = Object.assign({}, draft);
      return { fields };
    });
    window.console.log(JSON.stringify(event.detail.draftValues));
    window.console.log(" recordInputs \n", recordInputs);
    const promises = recordInputs.map((recordInput) =>
      updateRecord(recordInput)
    );
    window.console.log(" promises \n", promises);
    Promise.all(promises)
      .then((accounts) => {
        this.handleToast("Success", "Acocunt Records updated", "successs");
        this.draftValues = [];
        return refreshApex(this.refreshApexData);
      })
      .catch((error) => {
        console.log("Error occured \n ", error);
      });
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
