import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {

    footerHandler(event){
        console.log("footer handled");
    }

    handleClose(){
        console.log('Calling Parent Componet to close child modal');
        this.dispatchEvent(new CustomEvent('closemodal',{bubbles:true,
            detail:{
                msg: "Modal closed successfully."}
            }
        ));
    }
}