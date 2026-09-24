/**
 * Controller for accordion-related data retrieval as well as using LWC TabSet
 */
public with sharing class AccordionController {
  /**
   * Retrieves contact records used by the accordion component.
   *
   * @return List of contact records with mailing address details.
   */
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts() {
    try {
      return [
        SELECT
          Id,
          Name,
          MailingStreet,
          MailingCity,
          MailingPostalCode,
          MailingState,
          MailingCountry
        FROM Contact
        LIMIT 3
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
