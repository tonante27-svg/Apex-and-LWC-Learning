public with sharing class ClassB {
  public void dislayMessage() {
    ClassA ca = new ClassA();
    system.debug(ca.greet());
  }
}
