//CaseCleanupJob
public with sharing class DeleteOldClosedCases implements Schedulable{
    public void execute(SchedulableContext SC) {
        Datetime cutoffDate = System.now().addMonths(-6);
        List<Case> oldCases = [SELECT Id FROM Case WHERE Status = 'Closed' AND ClosedDate < :cutoffDate limit 100];
        
        if(!oldCases.isEmpty){
            delete oldCases;
        }else{
            System.debug('No cases have been found for cleanup');
        }
        
    }
}
/*
    string cronExpression =  '0 30 0 * * ? *';
    System.schedule('55th Minute Schedule Job Test',cronExpression, new DeleteOldClosedCases());
 
 */
