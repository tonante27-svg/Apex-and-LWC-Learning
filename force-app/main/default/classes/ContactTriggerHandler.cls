/**
 * Handles contact trigger logic for account rating updates.
 */
public with sharing class ContactTriggerHandler {
    public static Boolean isTriggerActive(String triggerName){
      Trigger_Settings__mdt conSetting = Trigger_Settings__mdt.getInstance(triggerName);
      
        System.debug('=== triggerName: ' + triggerName);
        System.debug('=== conSetting: ' + conSetting);
      
        if(conSetting != null && conSetting.IsActive__c ==true){
          return true;
      }
      return false;
    }
    /**
     * Validates a list of contacts for duplicate email addresses before insert or update.
     *
     * @param newContacts The contacts to validate.
     * @return A list of contacts that do not conflict with existing records.
     */
    public static List<Contact> hasduplicateEmail(List<Contact> newContacts){
            Set<String> emailSet = new Set<String>();
            List<Contact> contactsWithUniqueEmail = new List<Contact>();
            for(Contact con : newContacts){
                if(con.Email != null){
                    if(!emailSet.contains(con.Email)){    
                    emailSet.add(con.Email);
                    }
                }
            }
            List<Contact> conList = [SELECT Email FROM Contact WHERE Email IN :emailSet];
            if (emailSet.isEmpty()) {
                return newContacts;
            }
            Set<String> existingConEmails = new Set<String>();
             for(Contact c: conList){
	            existingConEmails.add(c.Email);
            }
            List<Contact> uniqueContacts = new List<Contact>();
            for(Contact con : newContacts){
                
                if(existingConEmails.contains(con.Email)){
                    con.addError('Duplicate contact exists with same email address, either use that or change the email address.');
                }else{
                    uniqueContacts.add(con);
                }
            }   
        return uniqueContacts;
    }

    public static Boolean hasBypassPermission(String permissionName){
        return FeatureManagement.checkPermission(permissionName);
    }   
    public static void setAccountRating(List<Contact> newContacts) {

        Set<Id> accIds = new Set<Id>();

        // Collect Account IDs
        for (Contact con : newContacts) {
            if (con.AccountId != null) {
                accIds.add(con.AccountId);
            }
        }

        // Query Accounts once
        Map<Id, Account> accRatingsMap = new Map<Id, Account>(
            [SELECT Id, Rating
             FROM Account
             WHERE Id IN :accIds]
        );

        // Update Contacts
        for (Contact con : newContacts) {

            Account acct = accRatingsMap.get(con.AccountId);

            if (con.Account_Rating__c == null &&
                acct != null &&
                acct.Rating != null) {

                con.Account_Rating__c = acct.Rating;
            }
        }
    }
}