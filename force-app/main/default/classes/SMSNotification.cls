public with sharing class SMSNotification implements Notification {
  public void sendNotification(String recipients, String message) {
    system.debug('This is the SMS notification ' + message);
    String phone = '8475259800';
    String msgBody = 'Hello, this is an SMS Test MSG';
    SmsUtility.sendSms(phone, msgBody);
  }
}
