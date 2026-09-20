public virtual with sharing class VirtualClassDemo {
  public virtual void virtualClassDemoMethod() {
    system.debug('this is a debug sattement inside base class virtual method');
  }

  public void nonVirtualMethod() {
    system.debug('Thiis is a non-virtual method');
  }
}
