({
    handleLwcMessage: function(component, event) {
        console.log('Aura handler executed');

       console.log('Event:', event);
        console.log('Detail:', event.getParam('detail'));
        console.log('Msg:', event.getParam('msg'));
        var msg = event.getParam('msg');
        console.log('Received message: ' + msg);

        component.set('v.message', msg);
    }
})