public virtual class OpportunityTriggerHandler {
  public virtual void beforeInsert(List<SObject> newList) {
    System.debug('Default Opportunity before insert');
  }
  public virtual void afterInsert(List<SObject> newList) {
    System.debug('Default Opportunity after insert');
  }
}
