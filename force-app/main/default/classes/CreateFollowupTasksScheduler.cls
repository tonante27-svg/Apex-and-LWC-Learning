public with sharing class CreateFollowupTasksScheduler Implements Schedulable{
    
    public void execute(SchedulableContext SC){
        Database.executeBatch(new CreateFollowupTasks(),200);
    }
}