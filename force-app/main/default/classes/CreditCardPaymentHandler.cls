public with sharing class CreditCardPaymentHandler extends DynamicPaymentProcessingHandler {
  public override void makePayment() {
    system.debug('Tsis is payment processing via credit card');
  }
}
