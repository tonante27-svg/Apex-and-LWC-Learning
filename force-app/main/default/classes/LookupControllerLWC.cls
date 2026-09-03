public with sharing class LookupControllerLWC {
  @AuraEnabled(cacheable=true)
  public static List<SObject> searchRecords(
    String searchKey,
    String objectApiName,
    String fieldApiName
  ) {
    // Sanitize and validate inputs
    if (
      String.isBlank(searchKey) ||
      String.isBlank(objectApiName) ||
      String.isBlank(fieldApiName)
    ) {
      return new List<SObject>();
    }

    // Validate Object and Field accessibility
    String cleanObject = String.escapeSingleQuotes(objectApiName.trim());
    String cleanField = String.escapeSingleQuotes(fieldApiName.trim());

    SObjectType sObjectType = Schema.getGlobalDescribe().get(cleanObject);
    if (sObjectType == null || !sObjectType.getDescribe().isAccessible()) {
      throw new AuraHandledException(
        'Invalid or inaccessible object: ' + cleanObject
      );
    }

    SObjectField sField = sObjectType.getDescribe()
      .fields.getMap()
      .get(cleanField);
    if (sField == null || !sField.getDescribe().isAccessible()) {
      throw new AuraHandledException(
        'Invalid or inaccessible field: ' + cleanField
      );
    }

    // Use bound variable for search key to prevent SOQL injection
    String key = '%' + String.escapeSingleQuotes(searchKey.trim()) + '%';

    // Construct query safely with validated tokenized fields
    String query =
      'SELECT Id, ' +
      cleanField +
      ' FROM ' +
      cleanObject +
      ' WHERE ' +
      cleanField +
      ' LIKE :key LIMIT 10';

    return Database.query(query);
  }
}
