/**
 * Service class for creating quick action Task records from Lightning components.
 */
public with sharing class QuickActionTaskService {
    
    /**
     * Creates a new Task record with the provided subject and description.
     *
     * @param subject The subject line to set on the Task.
     * @param description The description text to set on the Task.
     * @return The Id of the newly created Task.
     */
    @AuraEnabled
    public static Id createTask(String subject, String description){
        List<Task> tasks = new List<Task>();
        try {
            if (String.isBlank(subject)) {
                throw new AuraHandledException('Subject is required');
            }

            if (!Schema.SObjectType.Task.isCreateable()
                || !Schema.SObjectType.Task.fields.Subject.isCreateable()
                || !Schema.SObjectType.Task.fields.Description.isCreateable()) {
                throw new AuraHandledException('You do not have permission to create Task records.');
            }

            tasks.add(
                new Task(
                    Subject = subject,
                    Description = description
                )
            );

            Database.insert(tasks, AccessLevel.USER_MODE);
            return tasks[0].Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}