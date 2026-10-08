public with sharing class CreateContactTaskQueueable implements Queueable {
    private List<Contact> contacts;
    public CreateContactTaskQueueable( List<Contact> contacts) {
        this.contacts = contacts;
    }

    public void execute(QueueableContext QC){
        List<Task> tasks = new List<Task>();

        Integer currentDepth = AsyncInfo.getCurrentQueueableStackDepth();
        Integer maxDepth = AsyncInfo.getMaximumQueueableStackDepth();
        Integer minimumDelay = AsyncInfo.getMinimumQueueableDelayInMinutes();
        System.System.debug('==currentDepth=='+currentDepth);
        System.System.debug('==maxDepth=='+maxDepth);
        System.System.debug('==minimumDelay=='+minimumDelay);

        for(Contact con : contacts){
            tasks.add(
                new Task(
                        Subject = 'Queueable Followup Task Creation For Contact',
                        ActivityDate = System.today().addDays(3),
                        WhoId = con.Id,
                        Priority='Normal',
                        Status='Not Started'
                    ));
        }
        insert tasks;
    }
}