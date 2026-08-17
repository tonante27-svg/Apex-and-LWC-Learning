import { LightningElement } from 'lwc';
import JERRY_LOGO  from '@salesforce/resourceUrl/Jerry_image';
import TOM_LOGO  from '@salesforce/resourceUrl/Tom_image';
export default class IfElse extends LightningElement {
    /*private properties */ 
    jerryUrl = JERRY_LOGO;
    tomUrl = TOM_LOGO;
    isJerry = false;
    isTom = false;
    showTom(){
        this.isJerry = false;
        this.isTom = true;
    }
    showjerry(){
        this.isJerry = true;
        this.isTom = false;
    }
 }