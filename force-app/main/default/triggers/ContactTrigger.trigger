trigger ContactTrigger on Contact (before insert) {
    if(!ContactTriggerHandler.isTriggerActive('ContactTrigger')) {
        system.debug('Trigger is not active for this object.');
        return;     
    }
    if(ContactTriggerHandler.hasBypassPermission('Bypass_Contact_Trigger')) {
        system.debug('User has permission to bypass the trigger.'+UserInfo.getUserId());
        return;
    }
    if(Trigger.isBefore) {
        if(Trigger.isInsert) {
          List<Contact> uniqueContacts = ContactTriggerHandler.hasduplicateEmail(Trigger.new); 
            if(uniqueContacts.size() > 0) {
                ContactTriggerHandler.setAccountRating(uniqueContacts);
            }
           // ContactTriggerHandler.setAccountRating(Trigger.new);
        }
    }
}
