/**
 * @description Provides utility methods for creating Tasks from field values.
 */
public with sharing class TaskService {
    /**
     * @description Inserts a list of Task records using field wrappers.
     * @param taskFieldList The list of field wrappers containing task values.
     */
    @AuraEnabled
    public static void insertToDoTask(List<TaskFieldWrapper> taskFieldList) {
        List<Task> newTaskList = new List<Task>();
        system.debug('=== PARAM TASKFIELDLIST ==== '+taskFieldList[0]);
        try{    
            for(TaskFieldWrapper tfw : taskFieldList){
                system.debug('=== TASK FIELD LIST subject ===> '+tfw.subject);
                system.debug('=== TASK FIELD LIST activityDate ===> '+tfw.activityDate);
                system.debug('=== TASK FIELD LIST Status ====> '+tfw.status);
                system.debug('=== TASK FIELD LIST Priority ===> '+tfw.priority);
                system.debug('=== TASK FIELD LIST Description ===> '+tfw.description);
                newTaskList.add(new Task(Subject = tfw.subject,
                                    ActivityDate = tfw.activityDate,
                                    Status = tfw.status,
                                    Priority =tfw.priority,
                                    Description = tfw.description,
                                    OwnerId = UserInfo.getUserId()
                                    ));
            }
        
            if(!newTaskList.isEmpty()){
                insert newTaskList;
            }
        }catch(Exception e){
                    throw new AuraHandledException('There was a problem creating this new task: '+e.getMessage());
        }
    }

    /**
     * @description Holds the field values used to create a Task.
     */
   public class TaskFieldWrapper {
    @AuraEnabled public String subject { get; set; }
    @AuraEnabled public Date activityDate { get; set; }
    @AuraEnabled public String status { get; set; }
    @AuraEnabled public String priority { get; set; }
    @AuraEnabled public String description { get; set; }
}
}