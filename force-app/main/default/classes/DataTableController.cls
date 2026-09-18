/**
 * Controller class for retrieving a list of contacts for display in a Lightning Data Table.
 */
public with sharing class DataTableController {
  /**
   * Retrieves a list of contacts to display in the data table.
   *
   * @return A list of contact records limited to ten results.
   */
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactList() {
    List<Contact> contactList = new List<Contact>();
    try {
      contactList = [
        SELECT Id, Name, Phone, Title, Email, AccountId, Account.Name
        FROM Contact
        LIMIT 10
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
    return contactList;
  }
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList() {
    List<Account> accountList = new List<Account>();
    try {
      accountList = [
        SELECT
          Id,
          Name,
          Description,
          ShippingStreet,
          ShippingCity,
          ShippingPostalCode,
          ShippingCountry,
          ShippingState
        FROM Account
        LIMIT 10
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
    return accountList;
  }
}
