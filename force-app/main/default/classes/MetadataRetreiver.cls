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
    public static List<Object_Details__mdt> getMetadataRecords() {
        return [
            SELECT DeveloperName, MasterLabel, Label, QualifiedApiName,
                   ObjectAPIName__c, ObjectAPIName__r.QualifiedApiName,
                   ObjectLabel__c, PlaceUsed__c
            FROM Object_Details__mdt
        ];
    }
}