public with sharing class LeadManager {
  public static void convertLead(integer score) {
    //If lead isqualified then we willconvert thelead  else throw an error
    // Score > = 60% then lead is qualified
    Boolean isQualified = true;
    if (LeadService.isQualified(score)) {
      System.debug('Lead is ualified, converting lead');
    } else {
      system.debug('Lead isnot qualiified, cannot convert lead');
    }
  }
}
