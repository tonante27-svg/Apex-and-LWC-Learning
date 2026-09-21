public with sharing class EmailCaseHandler extends CaseHandler {
  public override Case createCase() {
    Case newCase = new Case(
      Origin = 'Email',
      Subject = 'Test Email Case',
      Status = 'New'
    );
    insert newCase;
    return newCase;
  }
}
