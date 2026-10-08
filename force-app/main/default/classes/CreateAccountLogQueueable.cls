public with sharing class CreateAccountLogQueueable implements Queueable{
    private List<Account> accounts = new List<Account>();
   public CreateAccountLogQueueable(List<Account> accounts){
        this.accounts = accounts;
   }
    public void execute(QueueableContext QC) {
        List<Account_Log__c> alogs = new List<Account_Log__c>();
        for(Account acct : accounts){
            alogs.add( new Account_Log__c(
                        Account__c = acct.Id,
                        Action__c ='Logging acount creation for Account: '+acct.Name,
                        ProcessedTime__c = System.Now()
            ));
        }
        insert alogs;
        Id AsynchJobId = System.enqueueJob(new CreateAccountLogTaskQeueueable(alogs));
    }
}