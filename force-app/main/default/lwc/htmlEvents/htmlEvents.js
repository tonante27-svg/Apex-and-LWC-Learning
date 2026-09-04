import { LightningElement } from "lwc";
export default class HtmlEvents extends LightningElement {
  handleNameChange(event) {
    console.log("handleNameChange");
    console.log(event.target.value);
  }

  handleEmailChange(event) {
    console.log("handleEmailChange");
    console.log(event.target.value);
  }

  handleClick(event) {
    console.log("handleClick");
    console.log(event.target);
    console.log(event.target.label);
    console.log(event.target.title);
    console.log(event.target.variant);
  }
}
