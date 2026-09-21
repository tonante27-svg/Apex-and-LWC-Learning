public with sharing class QRCodePaymentHandler extends DynamicPaymentProcessingHandler {
  public override void makePayment() {
    system.debug('Tsis is payment processing via QR Code card');
  }
}
