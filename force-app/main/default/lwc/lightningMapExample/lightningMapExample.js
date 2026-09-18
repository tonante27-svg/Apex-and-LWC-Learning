import { LightningElement, wire, track } from "lwc";
import getAccountList from "@salesforce/apex/DataTableController.getAccountList";
export default class LightningMapExample extends LightningElement {
  @track mapMarkers;
  listView;
  // mapMarkers = [
  //   {
  //     location: {
  //       Street: "The Landmark @ One Market, suite 300",
  //       City: "San Francisco",
  //       State: "CA",
  //       Country: "USA",
  //       PostalCode: "94105"
  //     },
  //     value: "location001",
  //     title: "The Landmark Building",
  //     description:
  //       "The Landmark is considered to be one of the city&#39;s most architecturally distinct and historically significant buildings.",
  //     icon: "standard:account"
  //   }
  // ];

  @wire(getAccountList)
  wiredAccounts({ data, error }) {
    if (data) {
      console.log("Data \n", data);
      data.forEach((acc) => {
        let mapObj = {
          location: {
            Street: acc.ShippingStreet,
            City: acc.ShippingCity,
            State: acc.ShippingState,
            Country: acc.ShippingCountry,
            PostalCode: acc.ShippingPostalCode
          },
          value: acc.Name,
          title: acc.Name,
          description: acc.Description,
          icon: "standard:account"
        };
        if (!this.mapMarkers) {
          this.mapMarkers = [];
        }
        this.mapMarkers.push(mapObj);
      });
      this.listView = "visible";
    } else if (error) {
      console.error("Error \n", error);
    }
    console.log("MAP MARKERS ====", this.mapMarkers);
  }
  selectedMarkerValue = "SF1";
  handleMarkerSelect(event) {
    this.selectedMarkerValue = event.target.selectedMarkerValue;
    console.log("Selected marker:", this.selectedMarkerValue);
  }
}
