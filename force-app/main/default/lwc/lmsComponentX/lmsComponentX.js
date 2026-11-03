import { LightningElement,wire } from 'lwc';
import {subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE} from "lightning/messageService";
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class LmsComponentX extends LightningElement {
    recievedMessage;
    subscription = null;
    context

    @wire(MessageContext)
    wiredMessageContect(context){
      if (context && !this.subscription) {
        this.context = context;
        this.subscription = subscribe(
          this.context,
          SAMPLEMC,
          (message) => this.handleMessage(message),
          { scope: APPLICATION_SCOPE },
        );
      }
    }

    // Encapsulate logic for Lightning message service subscribe  for this channel SAMPLEMC
  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.context,
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
 /* connectedCallback() {
    this.subscribeToMessageChannel();
  }*/

  disconnectedCallback() {
    this.unsubscribeFromMessageChannel();
  }

  handleMessage(message) {
    this.recievedMessage = message.lmsData.value? message.lmsData.value : "No message published";
  }
}