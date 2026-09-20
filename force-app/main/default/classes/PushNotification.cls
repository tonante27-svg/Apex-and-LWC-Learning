public with sharing class PushNotification implements Notification {
  public void sendNotification(String recipients, String message) {
    system.debug('This is the push notification ' + message);
  }
}
