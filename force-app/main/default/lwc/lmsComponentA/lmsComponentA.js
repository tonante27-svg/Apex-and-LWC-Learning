import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
export default class LmsComponentA extends LightningElement {

        inputValue
    @wire(MessageContext)
    messageContext;

    handleInputChange(event) {
        this.inputValue= event.target.value;
    }

    publishMessage(){
        const message = {
            lmsData: {
                value: this.inputValue
            }
        };
        publish(this.messageContext, SAMPLEMC, message );
    }
}