public abstract class BaseTriggerHandler implements InterfaceTriggerHandler {
  //Shared logic
  public void logTriggerExecution(String msg) {
    system.debug('Trigger Log: ' + msg);
  }

  //Abstract methods
  public abstract void beforeInsert(List<SObject> newList);
  public abstract void afterInsert(List<SObject> newList);
}
