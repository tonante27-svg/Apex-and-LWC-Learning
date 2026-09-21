public with sharing class PhoneCaseHandler extends CaseHandler {
  public override Case createCase() {
    Case newCase = new Case(
      Origin = 'Phone',
      Subject = 'Test Phone Case',
      Status = 'New'
    );
    insert newCase;
    return newCase;
  }
}
