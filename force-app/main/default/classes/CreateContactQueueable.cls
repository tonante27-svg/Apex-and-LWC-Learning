public with sharing class CreateContactQueueable implements Queueable{
    private List<Account> accounts = new List<Account>();

    public CreateContactQueueable(List<Account> accounts){
        this.accounts = accounts;
    }

    public void execute(QueueableContext QC) {
        list<Contact>contacts = new List<Contact>();
        for(Account acct : accounts){
            contacts.add(new Contact(
                    FirstName = 'Primary',
                    LastName = 'Contact',
                    AccountId=acct.Id,
                    Email = 'pcontact@salesforce.com'
                ));
        }
        insert contacts;
        System.debug('### BEFORE ENQUEUE ###');
        Integer delayInMunites = 1;
        Id taskJobId = System.enqueueJob(
            new CreateContactTaskQueueable(contacts),delayInMunites);
        
        System.debug('### AFTER ENQUEUE: ' + taskJobId + ' ###');    
    }
}