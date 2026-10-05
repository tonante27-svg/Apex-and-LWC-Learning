/**
 * Handles contact trigger logic for account rating updates.
 */
public with sharing class ContactTriggerHandler {
    public static Boolean isTriggerActive(String triggerName){
      Trigger_Settings__mdt conSetting = Trigger_Settings__mdt.getInstance(triggerName);
      if(conSetting != null && conSetting.IsActive__c ==true){
          return true;
      }
      return false;
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