import { LightningElement } from 'lwc';
import pubSub from 'c/pubSub';
export default class PubSubComponentA extends LightningElement {
    msg;
    inputHandler(event){
        this.msg = event.target.value;
        console.log(this.msg);
    }
    
    publishHandler(){
        console.log(`Inside the publish method of A ${this.msg}`);
        pubSub.publish('componentA',this.msg);
    }
}