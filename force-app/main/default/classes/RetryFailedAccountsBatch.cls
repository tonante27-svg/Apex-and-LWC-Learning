public with sharing class RetryFailedAccountsBatch implements Database.Stateful,Database.Batchable<SObject> {
    public List<Id> accountIds = new List<Id>();

    public RetryFailedAccountsBatch(List<Id> failedRecords) {
        this.accountIds = failedRecords;
    }

    public Database.QueryLocator  start(Database.BatchableContext BC){
        return Database.getQueryLocator('SELECT Id, Name, ownerId FROM Account WHERE Id In:accountIds');
    }

    public void execute(Database.BatchableContext BC, List<Account> failedAccounts){
        for(Account acc : scope){
                acc.Description = 'Account updated in 2nd attempt';
        }
        Database.update(scope,false);

    }

    public void finish(Database.BatchableContext BC){
            system.debug('Retry Batch Finshed');
    }
}