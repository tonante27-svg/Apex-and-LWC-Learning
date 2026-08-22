import { LightningElement } from 'lwc';

export default class ParentLab extends LightningElement {

    contacts = [];
        
    connectedCallback() {
        // debugger;
        console.log('From Parent Connected Callback');
         this.contacts = [
            {
            "id": "101",
            "FirstName":"Angela",
            "LastName": "Yu",
            "Email":"angiey@demo.net",
            "Title":"VP of Sales",
            "Picture":"https://saas-enterprise-8761-dev-ed--c.scratch.vf.force.com/resource/1771368946000/Angela_image?",
            "Salary": "5000"
        },
        {
            "id": "102",
            "FirstName":"Vivek",
            "LastName": "Rahul",
            "Email":"vivekr@demo.net",
            "Title":"Asst. Director",
            "Picture":"https://saas-enterprise-8761-dev-ed--c.scratch.vf.force.com/resource/1771368970000/Vivek_image?",
            "Salary": "4000"
        },
        {
            "id": "103",
            "FirstName":"Scott",
            "LastName": "Tanveer",
            "Email":"etanveer@demo.net",
            "Title":"CFO",
            "Picture": "https://saas-enterprise-8761-dev-ed--c.scratch.vf.force.com/resource/1771369325000/Scott_image?",
            "Salary": "56678"
        } 

        ];
       
    }
    renderedCallback(){
       
    //** Can Access the child elements Here */ */    
    }
    errorCallback(error, stack){
        console.log('I\'m from parent  errorCallback');
        console.error('The error occured while rendering the components',JSON.stringify(error));
        console.error('The complete stack for the error ',stack);
    }

    
}