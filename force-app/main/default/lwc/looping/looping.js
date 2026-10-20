import { LightningElement,track} from 'lwc';

export default class Looping extends LightningElement {

    @track carList=["Ford","Audi","Honda","Buick","Chevrolet","Toyota"];
    ceoList = [{
            id:1,
            company:"Google",
            name: "Sundar Pichai"
        },
        {
            id:2,
            company:"Amazon",
            name: "Andy Jassy"
        },
        {
            id:3,
            company:"Apple",
            name: "John Ternus,"
        },
        {
            id:4,
            company:"Facebook",
            name: "Mark Zuckerberg",
        }
    ];

}