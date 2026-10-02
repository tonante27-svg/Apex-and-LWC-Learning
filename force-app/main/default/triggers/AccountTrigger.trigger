trigger AccountTrigger on Account (
    before insert,
    before update,
    before delete,
    after insert,
    after update,
    after delete,
    after undelete
) {//BEFORE
    if(Trigger.isBefore) {
        system.debug('Entered BEFORE trigger');
        if(Trigger.isInsert) {
            system.debug('BEFORE INSERT logic is running');
        }
        else if(Trigger.isUpdate){
            system.debug('BEFORE UPDATE logic is running');
        }
        else if(Trigger.isDelete){
           system.debug('BEFORE DELETE logic is running'); 
        }
        
    }//AFTER
    if(Trigger.isAfter) {
        system.debug('Entered AFTER trigger');
        if(Trigger.isInsert) {
            system.debug('AFTER INSERT logic is running');
        }
        else if(Trigger.isUpdate){
            system.debug('AFTER UPDATE logic is running');
        }
        else if(Trigger.isDelete){
            List<Account_Delete_Audit__c> acctAuditList = new List<Account_Delete_Audit__c>();
            for(Account acc : Trigger.old){
                acctAuditList.add(New Account_Delete_Audit__c(
                            Account_Name__c = acc.Name, 
                            Account_Number__c = acc.Id,
                            Delete_On__c = System.Now(),
                            Industry__c = acc.Industry,
                            Deleted_By__c=UserInfo.getUserId()
                            ));
                    
                }
                insert acctAuditList;            
            }
        else if(Trigger.isUnDelete){
            system.debug('AFTER UNDELETE logic is running'); 
        }
        
    }  
    
}