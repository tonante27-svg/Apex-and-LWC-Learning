//Static Poly Morphsic - multiple methods with same name but diffrenet signtures and behaviors
public with sharing class PaymentProcessingHandler {
  //method for Cash payments

  //Add the logic to process various types of payments
  public void makePayment(Decimal amount) {
    system.debug('Flollowing amount has been paid via cash mode==> ' + amount);
  }

  public void makePayment(Decimal amount, String ccNumber) {
    system.debug('Flollowing amount has been paid via cash mode==> ' + amount);
  }

  public void makePayment(Decimal amount, String qrCode, String phoneNo) {
    system.debug('Flollowing amount has been paid via cash mode==> ' + amount);
  }

  public void processPayment(
    String paymentType,
    Decimal amount,
    string ccNumber,
    String qrCode,
    String phoneNo
  ) {
    system.debug('Flollowing amount has been paid via cash mode==> ' + amount);
    if (paymentType == 'cash') {
      makePayment(amount);
    } else if (paymentType == 'credit card') {
      makePayment(amount, ccNumber);
    } else if (paymentType == 'QRCode') {
      makePayment(amount, qrCode, phoneNo);
    } else {
      system.debug('Invalid Payement mode');
    }
  }
}
