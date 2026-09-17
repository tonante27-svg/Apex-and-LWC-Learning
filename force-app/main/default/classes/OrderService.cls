public with sharing class OrderService {
  Integer quantity;
  Decimal price;
  public OrderService(Integer quantity, Decimal price) {
    this.quantity = quantity;
    this.price = price;
  }
  public void getTotal() {
    system.debug(Order.calculateTotal(quantity, price));
  }
}
