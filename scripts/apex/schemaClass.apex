

String objApiName = 'Task';
String fieldApiName = 'Status';      

    List<ReminderService.PickList> pickListValueLists = new List<ReminderService.PickList>();
    Schema.SObjectType sObjectTypeObject = Schema.getGlobalDescribe().get('Task');
    //system.debug('sObjectTypeObject ===> '+sObjectTypeObject);
    Schema.DescribeSObjectResult describeSObjectResult = sObjectTypeObject.getDescribe();
    //system.debug('describeSObjectResult ===> '+describeSObjectResult);
    Map<String,Schema.SObjectField> fieldMap = describeSObjectResult.fields.getMap();
   // system.debug('FIELDMAP ===> '+fieldMap);
    List<Schema.PicklistEntry> pickListEntryList = fieldMap.get('Priority').getDescribe().getPickListValues();
    
    for(Schema.PicklistEntry picklist: pickListEntryList){
        pickListValueLists.add(new ReminderService.Picklist(picklist.getLabel(), picklist.getValue()));
    }
    system.debug('pickListValueLists ===> '+pickListValueLists);