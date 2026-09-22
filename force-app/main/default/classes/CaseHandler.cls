/** 
  This is the Abstract handler to be extended by:
  Extended By: EMailCaseHandler & PhoneCaseHandler classes.
**/
@SuppressWarnings('PMD.ApexDoc, PMD.ClassNamingConventions')
public abstract with sharing class CaseHandler {
  public CaseHandler() {
  }

  public abstract Case createCase();
  public void assignCase(Case passedCase) {
    if (passedCase.Origin == 'Email') {
      system.debug('assign case to the Email queue');
    } else if (passedCase.Origin == 'Phone') {
      system.debug('assign case to the Phone queue');
    } else {
      system.debug('assign case to the Default queue');
    }
  }
}
