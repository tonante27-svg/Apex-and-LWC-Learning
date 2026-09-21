public with sharing class CashPaymentHandler extends DynamicPaymentProcessingHandler {
  public CashPaymentHandler() {
  }

  public override void makePayment() {
    system.debug('This is payment processing via cash');
  }
}
