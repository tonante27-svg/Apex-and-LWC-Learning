/**
 * Asynchronoous Processor Handles trigger logic for Lead records.
 */
public with sharing class LeadTriggerHandler {
    /**
     * Checks whether the trigger for the specified name is active.
     *
     * @param triggerName The API name of the trigger setting metadata record.
     * @return True if the trigger is active, otherwise false.
     */
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
     * Creates tasks for the provided lead records in a future context.
     *
     * @param leadIds Set of lead Ids to process.
     */
    @Future //No Need for (callout=true) for now.
    public static void createFollowUpTasks(Set<Id> leadIds) {
        List<Task> newTasks = new List<Task>();
        for (Lead aLead : [SELECT Id, OwnerId, Company FROM Lead WHERE Id IN :leadIds WITH USER_MODE]) {
            newTasks.add(new Task(
                WhoId = aLead.Id,
                Subject = aLead.Company,
                Priority = 'Normal',
                Status = 'Not Started',
                ActivityDate = Date.today().addDays(3),
                OwnerId = aLead.OwnerId,
                Description = 'New Lead for Company: ' + aLead.Company
            ));
        }

        if (!newTasks.isEmpty()) {
            Database.insert(newTasks, AccessLevel.USER_MODE);
        }
    }
}