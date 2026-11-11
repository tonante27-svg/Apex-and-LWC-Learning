public with sharing class ReminderService {
    @AuraEnabled(cacheable=true) //Task, Status
    public static List<ReminderService.PickList> fetchPickListValues(String objApiName, String fieldApiName){
        
            List<ReminderService.PickList> pickListValueList = new List<ReminderService.PickList>();
            Schema.SObjectType sObjectTypeObject = Schema.getGlobalDescribe().get(objApiName);
            Schema.DescribeSObjectResult describeSObject = sObjectTypeObject.getDescribe();

            Map<String,Schema.SObjectField> fieldMap = describeSObject.fields.getMap();
            List<Schema.PicklistEntry> pickListEntryList = fieldMap.get(fieldApiName).getDescribe().getPickListValues();
            
            for(Schema.PicklistEntry picklist : pickListEntryList){
                pickListValueList.add(new ReminderService.Picklist(picklist.getLabel(), picklist.getValue()));
            }

            system.debug(System.LoggingLevel.DEBUG, JSON.serialize(pickListValueList));
            return pickListValueList;
       
        
    }
    @AuraEnabled
    public static Id createToDoItem(String objApiName,Map<String,Object> fieldValues){
        try {
            // Get the SObject type dynamically
            Schema.SObjectType objType = Schema.getGlobalDescribe().get(objApiName);
            system.debug('=== OBJTYPE === '+objType);

            // Instantiate the object
                SObject newRecord = objType.newSObject();
            Map<String, Schema.SObjectField> fieldMap = objType.getDescribe().fields.getMap();
            // Iterate through the Map
                for (String fieldName : fieldValues.keySet()) {
                   Schema.DescribeFieldResult fieldDescribe =
                        fieldMap.get(fieldName).getDescribe();

                    Object fieldValue = fieldValues.get(fieldName);

                    if (fieldDescribe.getType() == Schema.DisplayType.Date
                        && fieldValue instanceof String) {

                        fieldValue = Date.valueOf((String)fieldValue);
                    }
                    newRecord.put(fieldName,fieldValue);
                }   

            // Insert New Record
            insert newRecord;
            return (Id) newRecord.get('Id');
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    //Wrapper
    public class PickList {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;

        public PickList(String label, String value){
            this.label = label;
            this.value= value;
        }
    }
}