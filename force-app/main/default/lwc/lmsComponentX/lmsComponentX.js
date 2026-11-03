import { LightningElement,wire } from 'lwc';
import {subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE} from "lightning/messageService";

import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
export default class LmsComponentX extends LightningElement {
    recievedMessage;
    subscription = null;
    MessageContext
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for Lightning message service subscribe 
  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        SAMPLEMC,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE },
      );
    }
  }

  unsubscribeFromMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  // Standard lifecycle hooks used to subscribe ti the meesg channel when loaded
  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeFromMessageChannel();
  }

  handleMessage(message) {
    this.recievedMessage = message.lmsData.value? message.lmsData.value : "No message published";
  }
}