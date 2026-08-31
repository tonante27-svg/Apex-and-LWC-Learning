/**
 * Controller for retrieving account records used by Lightning Web Components.
 */
public with sharing class AccountController {
  /**
   * Retrieves a list of the most recently created account records for use in a Lightning Web Component.
   *
   * @return A list of up to 20 Account records with Id, Name, Phone, and Industry fields.
   */
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList() {
    return [
      SELECT Id, Name, Phone, Industry
      FROM Account
      ORDER BY createddate DESC
      LIMIT 10
    ];
  }
  /**
   * Updates the industry of an account record to Education for use in a Lightning Web Component.
   *
   * @param recordId The Id of the Account record to update.
   */
  @AuraEnabled
  public static void updateAccount(String recordId) {
    try {
      System.debug('recordId = ' + recordId);

      Account newAcct = new Account(Id = recordId);

      System.debug('account.Id = ' + newAcct.Id);

      newAcct.Industry = 'Education';
      update newAcct;
    } catch (Exception e) {
      throw new AuraException(e.getMessage());
    }
  }
  @AuraEnabled
  public static List<Account> getFilteredAccounts(String industry) {
    return [
      SELECT Id, Name, Phone, Industry
      FROM Account
      WHERE Industry = :industry
      ORDER BY createddate DESC
      LIMIT 100
    ];
  }
}
