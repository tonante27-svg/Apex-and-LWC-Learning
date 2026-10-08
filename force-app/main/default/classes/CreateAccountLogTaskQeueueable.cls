public with sharing class CreateAccountLogTaskQeueueable implements Queueable{
    private List<Account_Log__c> acctLogs;
    public CreateAccountLogTaskQeueueable( List<Account_Log__c> acctLogs) {
        this.acctLogs = acctLogs;
    }

    public void execute(QueueableContext QC){
        List<Task> tasks = new List<Task>();

        Integer currentDepth = AsyncInfo.getCurrentQueueableStackDepth();
        Integer maxDepth = AsyncInfo.getMaximumQueueableStackDepth();
        Integer minimumDelay = AsyncInfo.getMinimumQueueableDelayInMinutes();
        System.System.debug('==currentDepth=='+currentDepth);
        System.System.debug('==maxDepth=='+maxDepth);
        System.System.debug('==minimumDelay=='+minimumDelay);

        for(Account_Log__c acctLog : acctLogs){
            tasks.add(
                new Task(
                        Subject = 'Queueable Followup Task Creation For Account Log',
                        ActivityDate = System.today().addDays(3),
                        WhatId = acctLog.Id,
                        Priority='Normal',
                        Status='Not Started'
                    ));
        }
        insert tasks;
    }
}