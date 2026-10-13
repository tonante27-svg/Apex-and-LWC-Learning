public with sharing class CreateFollowUpTask implements Schedulable, Database.Batchable<SObject>{
    public Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('SELECT Id, name.ownerId FROM Accounr WHERE LastModifiedDate  <= LAST_2_MONTHS ');
    }

    public void execute(Database.BatchableContext BC, List<Account> scope) {
        List<Task> tasks = new List<Task>();
        for (Account acc : scope){
            tasks.add(new Task(
                WhatId = acc.Id,
                OwnerId = acc.OwnerId,
                Status='Not Started',
                Priority = 'Normal',
                ActivityDate = System.today().addDays(7),
                Subject = 'Follow Up'));
            
            if(!tasks.isEmpty()){
                List<Database.SaveResult> sr = Database.insert(tasks);
                for (Database.SaveResult result : sr) {
                    if (!result.isSuccess()) {
                        for(Database.error err : result.getErrors() ){
                            System.debug('Error: ' + err.getMessage());System.debug('Error: ' + err.getMessage());
                        }
                    }
                }
            }
        }
    }
    public void finish(Database.BatchableContext BC)  {
        system.debug('Followup Task Creation for old removed accounts has been completed.');   
    }   

    public void execute(SchedulableContext SC){

        String cronExpression = '0 0 0 2 * ? *';
        Database.executeBatch(new CreateFollowUpTask());
        System.schedule('Removed Accounts Followup Task Execution', cronExpression, new CreateFollowUpTask());
    }
}