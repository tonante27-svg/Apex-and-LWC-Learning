import { LightningElement } from 'lwc';

export default class Loops extends LightningElement {
user = {
    "name":"Amit Singh"
}
contacts = [
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