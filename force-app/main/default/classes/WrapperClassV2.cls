public with sharing class WrapperClassV2 {
  @AuraEnabled(cacheable=true)
  public static AccountWrapper wrapperMethod(Id AccountId) {
    //System.debug('== CONSOLE: === AccountId: ' + AccountId);
    List<Contact> contacts = [
      SELECT Id, LastName
      FROM Contact
      WHERE accountId = :AccountId
    ];
    List<Opportunity> opportunities = [
      SELECT Id, stageName, Name
      FROM Opportunity
      WHERE accountId = :AccountId
    ];
    Boolean offer = opportunities.size() > 2;
    AccountWrapper currentWrapper = new AccountWrapper();
    currentWrapper.conList = contacts;
    currentWrapper.oppList = opportunities;
    currentWrapper.specialOffer = offer;
    return currentWrapper;
  }

  public class AccountWrapper {
    @AuraEnabled
    public List<Contact> conList;
    @AuraEnabled
    public List<Opportunity> oppList;
    @AuraEnabled
    public boolean specialOffer;
  }
}
