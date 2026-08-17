import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactManager.getContactList';
const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Account', fieldName: 'AccountName' } // We will flatten this below
];

export default class ContactManager extends LightningElement {
searchTerm = '';
columns = COLUMNS;
@wire(getContactList, {searchKey: '$searchTerm'}) wiredContacts;
// Helper to flatten the Account.Name for the table
    get processedContacts() {
        if (this.wiredContacts.data) {
            return this.wiredContacts.data.map(contact => ({
                ...contact,
                AccountName: contact.Account ? contact.Account.Name : ''
            }));
        }
        return [];
    }
    handleSeacrhTerm(event){
        this.searchTerm = event.target.value;
    }

}