public class SmsUtility {
  @Future(callout=true)
  public static void sendSms(String mobileNumber, String messageBody) {
    HttpRequest req = new HttpRequest();
    // Use a Named Credential for secure authentication
    req.setEndpoint('callout:My_SMS_Provider_Named_Credential');
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/json');

    // Format payload based on your provider's API requirements
    String jsonPayload = JSON.serialize(
      new Map<String, Object>{ 'to' => mobileNumber, 'body' => messageBody }
    );
    req.setBody(jsonPayload);

    Http http = new Http();
    HttpResponse res = http.send(req);

    if (res.getStatusCode() != 200 && res.getStatusCode() != 201) {
      System.debug('Failed to send SMS: ' + res.getBody());
    }
  }
}
