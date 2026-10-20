import { LightningElement,track} from 'lwc';

export default class HelloWorld extends LightningElement {
    /***Data binding Example */
    fullname = "Zero to Hero";
    title = "aura";

    handlerOnChange(event){
        this.title = event.target.value;
    }
    /***@Track Binding Example  */
     @track address = {
        street:"323 W. 101 Place",
        city:"Chicago",
        state:"IL",
        postal:60628,
        country:"US"
    }
    handlerTrack(event){
        this.address.city = event.target.value;
    }

    /*** Getter   */
    users = ["john","smith","nick"];
    num1 = 10;
    num2 = 20;

    get firstUser(){
        return this.users[0];
    }

    get sumOfNumbers(){
        return this.num1 + this.num2;
    }
}