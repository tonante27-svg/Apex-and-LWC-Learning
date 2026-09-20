public with sharing class VirtualSubClassDemo extends VirtualClassDemo {
  public override void virtualClassDemoMethod() {
    super.virtualClassDemoMethod();
    system.debug('This is a debug statement inside subclass Virtual Method');
  }
}
