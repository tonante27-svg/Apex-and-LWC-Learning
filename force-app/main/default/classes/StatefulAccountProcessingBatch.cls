public with sharing class StatefulAccountProcessingBatch implements Database.Batchable<SObject>,
Database.Stateful {
    Integer totalProcessed = 0;
    Integer totalSuccess = 0;
    Integer totalFailed = 0;
    List<Id> failedRecords = new list<ID>();

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name, OwnerId FROM Account WHERE LastModifiedDate = LAST_N_DAYS:30');
    }

    public void execute(Database.BatchableContext bc, List<Account> scope) {
       totalProcessed += scope.size();
       for(account acc : scope){
            acc.description = 'updated via stateful Batch';
       }
       List<Database.SaveResult> results = Database.update(scope,false);
       for(Database.SaveResult sr: results){
        if(sr.isSuccess()){
            system.debug('Record was successfully updated.');
            totalSuccess++;
        }else{
            for(Database.error err : sr.getErrors()){
                system.debug('Error '+err.getStatusCode()+' - '+ err.getMessage());
                totalFailed++;
                failedRecords.add(sr.getId());
            }
        }
       }


    }

    public void finish(Database.BatchableContext bc) {

        System.debug('Total records processed: '+totalProcessed);
        System.debug('Total records failed: '+totalFailed);
        System.debug('Total records suuccessful: '+totalFailed);
        Database.executeBatch(new RetryFailedAccountsBatch(failedRecords));
    }
}