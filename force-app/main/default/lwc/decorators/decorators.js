import { LightningElement,api,wire,track } from 'lwc';

export default class Decorators extends LightningElement {
    //Public property
    @api name='' ;
    @track user={
            name: 'Tony Milsap',
            age: '35',
            address :{
                city: 'Chicago',
                state: 'IL',
                postalCode:{
                    zip:'60628',
                    province: '' 
                },
                country:{
                    name:'United States',
                    code:'US'
                }
            }

    }

    handleChangeInfo(){
        this.user={
            name: 'Rigberto Jimenez',
            age: '39',
            address :{
                city: '',
                state: '',
                postalCode:{
                    zip:'',
                    province: '' 
                },
                country:{
                    name:'Mexico',
                    code:'MX'
                }
            }

        }
    }



}