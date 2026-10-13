/**
 * Batch job that retrieves account details from an external API.
 */
public with sharing class AccountGetCalloutBatch implements Database.AllowCallouts, Database.Batchable<SObject> {
    /**
     * Returns the Account records selected for processing in this batch.
     * @return Query locator for the Account records.
     */
    public Database.QueryLocator start() {
        return Database.getQueryLocator('SELECT Id, Name, OwnerId FROM Account LIMIT 50');
    }

    /**
     * Sends a GET request for each Account in the current batch scope.
     * @param bc Batch context.
     * @param scope Account records in the current batch.
     */
    public void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.example.com/account/' + acc.Id);
            req.setMethod('GET');
            HttpResponse res = http.send(req);
        }
    }

    /**
     * Handles any final processing after the batch completes.
     * @param bc Batch context.
     */
    public void finish(Database.BatchableContext bc) {
    }
}