/**
 * Handler class for an Account record. Which will be inherited by both Parnter and Custom Handler Classes
 */
public abstract with sharing class AccountHandler {
  public String accountId;

  /**
   * Constructs an AccountHandler for the given Account Id.
   * @param accountId Id of the Account.
   */
  public AccountHandler(String accountId) {
    this.accountId = accountId;
  }

  /**
   * Displays the current Account's name.
   */
  public void displayAccountDetails() {
    Account currentAcc = [
      SELECT Id, Name
      FROM Account
      WHERE Id = :accountId
      WITH USER_MODE
      LIMIT 1
    ];
    System.debug('This is the Account Name : ' + currentAcc.Name);
  }
}
