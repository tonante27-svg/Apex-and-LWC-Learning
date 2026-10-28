import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import renderTemplate from './renderMethod.html';
import Toast from 'lightning/toast';

export default class RenderMethod extends LightningElement {
    selectedTemplate
    renderOptions = [
        {label:"Select Options",value:"Select Options"},
        {label:"Sign-in", value:"Sign-in"},
        {label:"Sign-up", value:"Sign-up"}
    ];
    signInOptions = [
        {label:"Render", value:"Render"},
        {label:"Sign-up", value:"Sign-up"}
    ];
    signUpOptions = [
        {label:"Render", value:"Render"},
        {label:"Sign-in", value:"Sign-in"}
    ];
    render(){
        console.log(`RENDER: >> The selected template is ===> ${this.selectedTemplate}`);
        return this.selectedTemplate === "Sign-in" ? signinTemplate:
        this.selectedTemplate === "Sign-up" ? signupTemplate:
        renderTemplate;
    }

    handleSelect(event){
        this.selectedTemplate = event.target.value;
        console.log(`HANDLER>> The selected template is ===> ${this.selectedTemplate}`);
    }

    handleClick(event){
        this.selectedTemplate = 'Select Options';
        //this.renderOptions[0] = {label:"Select Options",value:"Select Options"};
    }

    submitHandler(event){
        this.callToast(`${event.target.label}`,`${event.target.label} was Successful`,'success');
    }

    callToast(lab, msg, vary){
        Toast.show({
                label:lab,
                message:msg,
                variant:vary
            });
    }
}