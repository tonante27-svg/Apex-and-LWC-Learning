public with sharing class AmountCalculator {
  public Decimal calculateAmount(Decimal amount) {
    Decimal totalAmount = amount + calculateTax(amount);
    return totalAmount;
  }
  private Decimal calculateTax(Decimal amount) {
    Decimal taxRate = .08;
    return taxRate * amount;
  }
}
