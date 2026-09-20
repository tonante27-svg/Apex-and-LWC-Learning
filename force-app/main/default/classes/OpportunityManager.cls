public with sharing class OpportunityManager {
  public string opportunityName;
  public String stageName;
  public date closeDate;
  public static integer totalOpportunities = 0;
  public void createOpportunity() {
    opportunity opp = new opportunity();
    opp.name = opportunityName;
    opp.StageName = stageName;
    opp.CloseDate = closeDate;
    insert opp;
    totalOpportunities++;
    system.debug('this i the newly created opportnity ==' + opp);
  }

  public static List<Opportunity> allClosedOpportunities() {
    List<Opportunity> allClosedOppty = [
      SELECT Id Name
      FROM Opportuity
      WHERE stageName = 'Closed-Won'
    ];
  }
}
