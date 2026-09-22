/**
 * @description Handles pagination and selection logic for accounts in Visualforce pages
 */
public with sharing class AccountPagination {
  private ApexPages.StandardSetController stdSetController;
  private List<Account> accts;
  //Constructor
  public AccountPagination(ApexPages.StandardSetController stdSetController) {
    this.stdSetController = stdSetController;
    this.accts = (List<Account>) stdSetController.getRecords();
  }

  public Integer getPaginationPage() {
    return stdSetController.getPageNumber();
  }

  public Integer getPaginationTotalPages() {
    return (Integer) Math.ceil(
      (Decimal) stdSetController.getResultSize() /
      stdSetController.getPageSize()
    );
  }

  public PageReference selectAll() {
    for (Account an_account : accts) {
      an_account.isSelected__c = true;
    }
    update accts;
    return null;
  }

  public PageReference unSelectAll() {
    for (Account an_account : accts) {
      an_account.isSelected__c = false;
    }
    update accts;
    return null;
  }

  public PageReference deleteSelected() {
    List<Account> deleteAccounts = new List<Account>();
    for (Account an_account : accts) {
      if (an_account.isSelected__c) {
        deleteAccounts.add(an_account);
      }
    }
    if (!deleteAccounts.isEmpty()) {
      delete deleteAccounts;
    }
    return null;
  }

  public PageReference Last() {
    this.stdSetController.last();
    return null;
  }

  public PageReference Next() {
    this.stdSetController.next();
    return null;
  }
}
