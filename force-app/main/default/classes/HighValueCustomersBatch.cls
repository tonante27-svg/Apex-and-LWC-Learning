public with sharing class HighValueCustomersBatch implements Database.Batchable<AggregateResult>{
    /**
     * Returns the Account records selected for processing in this batch.
     * @return Query locator for the Account records.
     */
    public Iterable<AggregateResult> start(database.BatchableContext BC) {
        List<AggregateResult> data = [SELECT accountId accid,SUM(AMOUNT) totalAMt from Opportunity
                                        WHERE isClosed = true GROUP BY AccountId HAVING SUM(Amount) > 50000];
        return data;
    }
    
    /**
     * Sends a GET request for each Account in the current batch scope.
     * @param bc Batch context.
     * @param scope Account records in the current batch.
     */
    public void execute(Database.BatchableContext bc, List<AggregateResult> scope) {
        
        List<Task> tasksToCreate = new List<Task>();
        for (AggregateResult ar : scope) {
            Id accId = (Id)ar.get('accid');
            Decimal totalAmt = (Decimal)ar.get('totalAMt');
            tasksToCreate.add(new Task(
                WhatId = accId,
                Subject = 'High Value Customer Follow Up',
                Status = 'Not Started',
                Priority = 'High',
                Description = 'Total Amount Closed'+totalAmt,
                ActivityDate = System.today().addDays(3)));

        if(!tasksToCreate.isEmpty()){
            insert tasksToCreate;
        }
    }}  

    /**
     * Handles any final processing after the batch completes.
     * @param bc Batch context.
     */
    public void finish(Database.BatchableContext bc) {
        System.debug('GET callout Batch Completed');
    }
}