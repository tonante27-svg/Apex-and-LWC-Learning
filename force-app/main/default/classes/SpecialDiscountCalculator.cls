public with sharing class SpecialDiscountCalculator extends DiscountCalculator {
  public Decimal SpecialDiscountCalculatorMethod(decimal amount) {
    Decimal normalDiscount = discountCalculatorMethod(amount);
    Decimal specialDiscount = amount * .20;
    return normalDiscount + specialDiscount;
  }
}
