import LightningDatatable from "lightning/datatable";
import imageTemplate from "./templates/image.html";
import picklistTemplate from "./templates/picklist.html";
import lookupTemplate from "./templates/lookup.html";
export default class Ltngdatatable extends LightningDatatable {
  static customType = {
    image: {
      template: imageTemplate, //The HTML file that will get rendered
      tyepAttributes: ["height", "width", "alt"], // the attribute of the custom data type that we have created
      //value- imageUrl
    },
    picklistTemplate: {
      template: picklistTemplate,
      tyepAttributes: [
        "name",
        "label",
        "placeholder",
        "options",
        "index",
        "varaint",
      ],
    },
    lookup: {
      template: lookupTemplate,
      typeAttributes: [
        "objectApiName",
        "label",
        "placeholder",
        "recordId",
        "recordName",
      ],
    },
  };
}
