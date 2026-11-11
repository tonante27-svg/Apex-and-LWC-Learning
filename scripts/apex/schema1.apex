//A Teaching Journey on how to master Dynamic Apex coding wheere you maye need a piece of code to handle various Object Types
String objectName = 'Task';
Map<String,Object> fieldValues = new Map<String,Object>{'Subject' =>'Dynamic Test',
                                                        'Status'=>'Not Started',
                                                        'ActivityDate'=> Date.newInstance(2026, 11, 11),
                                                        'Priority'=>'Low',
                                                        'Description'=>'Hi'
};
// Get the SObject type dynamically
    Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
    system.debug('=== OBJTYPE === '+objType);

// Instantiate the object
    SObject newRecord = objType.newSObject();

 // Iterate through the Map
    for (String fieldName : fieldValues.keySet()) {

        newRecord.put(fieldName, fieldValues.get(fieldName));

    }   

    // Insert New Record
    insert newRecord;
    system.debug('=== NEW RECORD == '+newRecord);
