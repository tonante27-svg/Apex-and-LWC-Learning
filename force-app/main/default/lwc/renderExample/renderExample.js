import { LightningElement } from 'lwc';
import templateOne from './templates/templateOne.html';
import templateTwo from './templateTwo.html';
import renderExample from './renderExample.html';

export default class RenderExample extends LightningElement {
    showTemplateOne = true;
    showDefault = false;
    render(){
        if(this.showTemplateOne){ 
            return templateOne;
        }else if(this.showDefault){
            return renderExample;
        }
       return  templateTwo;
    }
    handleTemp1(){
        this.showTemplateOne = true;
        this.showDefault = false;
    }
    handleTemp2(){
        this.showTemplateOne = false;
        this.showDefault = false;
    }
    handleDefault(){
        this.showTemplateOne = false;
        this.showDefault = true;
      
    }

}