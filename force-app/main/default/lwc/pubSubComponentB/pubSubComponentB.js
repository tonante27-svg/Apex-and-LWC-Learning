import { LightningElement } from 'lwc';
import pubSub from 'c/pubSub';
export default class PubSubComponentB extends LightningElement {
    msg;
    connectedCallback(){
        this.callSubscriber();
    }

    callSubscriber(){
        console.log('INside Subscriber' );
        pubSub.subscribe('componentA',(msg)=>{
            this.msg = msg;
        });
    }
}