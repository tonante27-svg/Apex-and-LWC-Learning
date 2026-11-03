({
    handleChanged : function(component, message) {
        if(message != null && message.getParam("lmsData") != null && message.getParam("lmsData").value != null) {
            component.set("v.messageReceived",message.getParam("lmsData").value);
        }
    },
    handleInputChange : function(component, event) {
        component.set("v.messageValue",event.target.value);
    },
    publishMessage : function(component, event) {
        let message = {
            lmsData: {
                value: component.get("v.messageValue")
            }
        };
        // Note that message will be usedin the subscriber on AuraSubscriberLMS to display the message published from this component
        var messageChannel = component.find("SampleMessageChannel");
        messageChannel.publish(message);
    }
});