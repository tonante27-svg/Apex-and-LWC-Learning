import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
export default class LmsComponentA extends LightningElement {

    inputValue;

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
        // Note that message will be usedin the subscriber on LmsComponentX to display the message published from this component
        publish(this.messageContext, SAMPLEMC, message );
    }
}