public with sharing class BankAccount2 {
  public static final String BANK_NAME = 'ABC BANK'; // class level constant
  public final String accountNumber; // instance level constant
  public BankAccount2(String accNum) {
    this.accountNumber = accNum;
  }

  public void showDetails() {
    system.debug('Bank Details ' + BANK_NAME);
    system.debug('AccountNumber ' + accountNumber);
  }
}
