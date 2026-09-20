public interface InterfaceTriggerHandler {
  void beforeInsert(List<SObject> newList);
  void afterInsert(List<SObject> newList);
  void beforeUpdate(List<SObject> oldList, List<SObject> newList);
  void afterUpdate(List<SObject> oldList, List<SObject> newList);
}
