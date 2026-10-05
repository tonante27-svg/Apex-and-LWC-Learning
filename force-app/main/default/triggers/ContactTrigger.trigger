trigger ContactTrigger on Contact (before insert) {
    if(!ContactTriggerHandler.isTriggerActive('ContactTriggerHandler')) {
        system.debug('Trigger is not active for this object.');
        return;     
    }
    if(Trigger.isBefore) {
        if(Trigger.isInsert) {
            ContactTriggerHandler.setAccountRating(Trigger.new);
        }
    }
    
}
