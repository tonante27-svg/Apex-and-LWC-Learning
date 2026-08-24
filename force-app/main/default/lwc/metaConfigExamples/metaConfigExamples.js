import { LightningElement, api } from 'lwc';

export default class MetaConfigExamples extends LightningElement {
    @api message;
    @api objectName;
    @api showHeader; 
    @api maxRecords;
    @api recordId;
}