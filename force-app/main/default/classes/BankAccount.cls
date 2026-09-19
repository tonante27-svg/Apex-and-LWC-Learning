public with sharing class BankAccount {
  String accountNumber;
  String accountType;
  Decimal balance;

  public BankAccount() {
    this.balance = 0;
    this.accountType = 'Savings';
  }

  public BankAccount(String accountNumber, Decimal balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  public BankAccount(
    String accountNumber,
    Decimal balance,
    String accountType
  ) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.accountType = accountType;
  }

  public void deposit(Decimal amount) {
    balance += amount;
  }

  public String getAccountInfo() {
    return 'Account Number : ' +
      accountNumber +
      '\n' +
      ' AccountType: ' +
      accountType +
      '\n' +
      ' Balance: ' +
      balance;
  }
}
