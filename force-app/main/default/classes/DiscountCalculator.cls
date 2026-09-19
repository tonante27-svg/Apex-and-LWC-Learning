public virtual class DiscountCalculator {
  protected Decimal normalDiscount = 0.10;

  protected Decimal DiscountCalculatorMethod(Decimal amount) {
    return amount * normalDiscount;
  }
}
