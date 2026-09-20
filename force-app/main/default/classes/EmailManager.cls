public class EmailManager {
  public static void sendMail(String address, String subject, String body) {
    // Create the email message object
    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

    // Set recipient address
    String[] toAddresses = new List<String>{ address };
    mail.setToAddresses(toAddresses);

    // Set email details
    mail.setSubject(subject);
    mail.setPlainTextBody(body);

    // Send the email via Messaging class
    Messaging.SendEmailResult[] results = Messaging.sendEmail(
      new List<Messaging.SingleEmailMessage>{ mail }
    );

    // Inspect results if needed
    inspectResults(results);
  }

  private static void inspectResults(Messaging.SendEmailResult[] results) {
    for (Messaging.SendEmailResult res : results) {
      if (res.isSuccess()) {
        System.debug('Email sent successfully.');
      } else {
        System.debug('Errors occurred: ' + res.getErrors());
      }
    }
  }
}
