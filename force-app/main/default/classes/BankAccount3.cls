public with sharing class BankAccount3 {
  private Decimal balance = 0; //sensitive info

  public void deposit(Decimal amount) {
    if (amount > 0) {
      balance += amount;
    }
  }
  public void withdraw(Decimal amount) {
    if (amount > 0 && balance > amount) {
      balance -= amount;
    }
  }

  public Decimal getBalance() {
    return balance;
  }
}
