/**
 * Retrieves metadata configuration records used by the application.
 */
public with sharing class MetadataRetreiver {
    /**
     * Returns the Object_Details__mdt records available in the org.
     *
     * @return A list of metadata records containing object detail information.
     */
    @AuraEnabled(cacheable=true)
    public static List<sObject> getMetadataObjectRecords(String objectApiName, String placeToBeUsed, String usedFor) {
        return [
            SELECT Id,
                FieldAPIName__c,
                FieldAPIName__r.QualifiedApiName,
                ObjectAPIName__c, 
                ObjectAPIName__r.QualifiedApiName,
                ParentObjectDetails__c,
                Order__c,
                UserFor__c
            FROM 
                ChildFieldDetails__mdt 
            WHERE ParentObjectDetails__r.Object_API_Name__r.QualifiedApiName =:objectApiName AND 
                ParentObjectDetails__r.PlaceUsed__c=:placeToBeUsed 
                (UseFor__c =: usedFor OR UseFor__c='Both Edit/New Record')
            ORDER BY 
                Order__c ASC 
            LIMIT 
                100
        ];
    }
}