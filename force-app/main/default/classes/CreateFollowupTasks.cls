public class CreateFollowupTasks implements Database.Stateful, Database.Batchable<sObject>, Schedulable{
    private Integer oldAccountsCnt = 0;
    
    public Database.QueryLocator start(Database.BatchableContext BC){
        String query = 'SELECT  Id, Name,Industry,LastModifiedDate FROM Account WHERE Industry NOT IN (\'Banking\',\'Energy\',\'Education\') AND  LastModifiedDate <= LAST_N_MONTHS:2';
        return Database.getQuerylocator(query);
    }
    public void execute(Database.BatchableContext BC, List<Account> scope){
            system.debug('execite method inside batch');
            List<Task> taskList = new List<Task>();
            for(Account acc : scope){
                //Create the followup task for this old Account
                taskList.add(
                    new Task(
                        Subject = 'Followup Task for old account: '+acc.Name+' needing removal',
                        Priority = 'Normal',
                        ActivityDate = System.today().addDays(3),
                        Status = 'Not Started',
                        WhatId = acc.Id
                    )
                );
            }
            if(!taskList.isEmpty()){
               List<Database.SaveResult> results = Database.insert(taskList);
               for(Database.SaveResult sr : results ){
                    if(sr.isSuccess()){
                         oldAccountsCnt++;
                    }else{
                        for(Database.Error err : sr.getErrors()){
                            system.debug(LoggingLevel.ERROR,
                            'Task insert failed: '+err.getMessage()
                            );
                        }

                    }
               }
            }

    }

    public void finish(Database.BatchableContext BC){
            system.debug('finish method inside batch');
            System.debug('=== The number of processed task records processed was:  '+oldAccountsCnt);
    }
    public void execute(SchedulableContext SC){
        Database.executeBatch(new CreateFollowupTasks(),200);
    }
}