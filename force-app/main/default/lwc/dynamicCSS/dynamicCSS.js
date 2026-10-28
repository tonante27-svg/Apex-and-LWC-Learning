import { LightningElement } from 'lwc';

export default class DynamicCSS extends LightningElement {

    percent = 0;
    
    changeHandler(event){
        this.percent = event.target.value;
        console.log(`Percentage is ${this.percent}`);
    }

    get percentage(){
        if(this.percent >= 0 && this.percent <= 100){
            return `width:${this.percent}%`;
        }
    }
}