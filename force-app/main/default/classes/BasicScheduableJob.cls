public with sharing class BasicScheduableJob implements Schedulable{
    public void execute(SchedulableContext SC) {
            system.debug('Schedulable Job is executed');
    }
}