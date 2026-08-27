import { LightningElement,api } from 'lwc';

export default class ContactListIItem extends LightningElement {
   @api contact;

   handleImageClick(event){
      event.preventDefault();
      console.log(`Contact is ${this.contact.FirstName} `);
      this.dispatchEvent(new CustomEvent(
         'contactselected',{
         detail: this.contact.Email,
         bubbles: true
      }));
   }
}