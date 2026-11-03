import { LightningElement,api } from 'lwc';

export default class LwcAuraCommunication extends LightningElement {
@api title;

    handleAura() {
        console.log('Button clicked');

        this.dispatchEvent(
            new CustomEvent('lwcmessage', 
                {
                    detail: {"msg": 'Hello this message is from LWC'}
                })
        );
    }

}