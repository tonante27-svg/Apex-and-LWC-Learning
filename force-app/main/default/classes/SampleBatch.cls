public class SampleBatch implements Database.Batchable<SObject> {
  public Database.QueryLocator start(Database.BatchableContext BC) {
    String query = 'SELECT  Id, Name,Industry,LastModifiedDate FROM Account WHERE Industry NOT IN (\'Banking\',\'Energy\',\'Education\') AND  LastModifiedDate <= LAST_N_MONTHS:2';
    return Database.getQuerylocator(query);
  }
  public void execute(Database.BatchableContext BC, List<sObject> scope) {
    system.debug('execite method inside batch');
  }

  public void finish(Database.BatchableContext BC) {
    system.debug('finish method inside batch');
  }
}
