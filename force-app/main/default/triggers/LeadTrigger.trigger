trigger LeadTrigger on Lead (after insert) {
  //Check to see if Trigger ByPass is active using MetaDataType
  if(!LeadTriggerHandler.isTriggerActive('LeadTrigger')) {
        system.debug('Trigger is not active for this object.');
        return;     
    }
  
    // Creation of task will be done assynchronously using Future method to avoid hitting governor limits
    Set<id> leadIds = new Set<id>();
    if(Trigger.isAfter && Trigger.isInsert) {
        for(Lead l : Trigger.new){
           leadIds.add(l.Id); 
        }
        LeadTriggerHandler.createFollowUpTasks(leadIds);
    }
}