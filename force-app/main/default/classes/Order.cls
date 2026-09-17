public with sharing class Order {
  public static Decimal calculateTotal(Integer quantity, Decimal price) {
    return quantity * price;
  }
}
