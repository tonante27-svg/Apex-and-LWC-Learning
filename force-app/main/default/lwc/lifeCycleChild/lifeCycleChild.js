import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
      constructor(){
        super()
        console.log('Child constructor called.');
    }
    interval
    //Setting a timer here woul dbe dangerous if we didn't call disconnectCallback() below.
    connectedCallback(){
        console.log('Child connectedCallback called.');
        // window.addEventListener('click',this.handleClick);
        // this.interval = window.setInterval(() => {
        //     console.log("This message appears every second.");
        //     }, 1000);
        throw new Error('Loading of child component failed.')
    };

    renderedCallback(){
        console.log('Child renderedCallback called.');
    }
    disconnectedCallback(){
        //alert('Child disconnectedCallback called');
        //Removing the component from the DOM
       // window.removeEventListener('onclick', this.handleClick) //<-- Important
      // window.clearInterval(this.interval);
    }
}