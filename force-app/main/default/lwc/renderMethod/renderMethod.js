import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import renderTemplate from './renderMethod.html';
import Toast from 'lightning/toast';

export default class RenderMethod extends LightningElement {
    selectedTemplate
    renderOptions = [
        {label:"Select Options",value:"Select Options"},
        {label:"Signin", value:"Signin"},
        {label:"Singup", value:"Signup"}
    ];
    signInOptions = [
        {label:"Render", value:"Render"},
        {label:"Singup", value:"Signup"}
    ];
    signUpOptions = [
        {label:"Render", value:"Render"},
        {label:"Singin", value:"Signup"}
    ];
    render(){
        console.log(`RENDER: >> The selected template is ===> ${this.selectedTemplate}`);
        return this.selectedTemplate === "Signin" ? signinTemplate:
        this.selectedTemplate === "Signup" ? signupTemplate:
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