import { LightningElement, api } from 'lwc';
import templateOne from './templates/templateOne.html';
import parent from './renderLwc.html';
export default class RenderLwc extends LightningElement {
     @api myVal = "Whatever value";
     toggleTemplate = false;
     
     render(){
        return this.toggleTemplate?templateOne:parent;
     }

     handleClick(){
        this.toggleTemplate = this.toggleTemplate?false:true;
     }
}