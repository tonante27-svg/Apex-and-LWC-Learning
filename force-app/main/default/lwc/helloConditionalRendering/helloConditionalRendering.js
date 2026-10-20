import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
    isVisible = false;
    isHello = false;
    helloText;

    handleClick(){
        this.isVisible = true;
    }

    handlerChange(event){
        this.helloText = String(event.target.value).toLowerCase();
    }
     get helloMethod(){
          return this.helloText === 'hello';
     }
}