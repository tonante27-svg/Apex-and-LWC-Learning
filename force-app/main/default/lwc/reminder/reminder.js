import { LightningElement,track } from 'lwc';

export default class Reminder extends LightningElement {
    @track toDoList = [];
    @track errors;

}