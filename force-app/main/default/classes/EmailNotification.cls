public with sharing class EmailNotification implements Notification {
  public void sendNotification(String recipients, String message) {
    system.debug('This is the email notifiction: ' + message);
    //Could use a constructor or two here instead of creating local vars here.
    String address = recipients;
    String subject = 'Sending An Email Message Test';
    String body = message;
    EmailManager.sendMail(address, subject, body);
  }
}
