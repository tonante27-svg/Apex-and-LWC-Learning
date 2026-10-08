public with sharing class SampleQueueableJob implements Queueable{
    private List<Account> accounts;
    public SampleQueueableJob(List<Account> accountList){
        this.accounts = accountList;
    }

    public void execute(QueueableContext QC) {
        Id JobId = QC.getJobId();
        system.debug('Queueable Apex job is running with Job ID ===> '+JobId);
        for(Account acct : accounts){
            system.debug('acct.name is: '+acct.Name);
        }
    }
}