public with sharing class TransientExample {
  public string name = 'Tony';
  public transient List<Integer> tempList = new List<Integer>{ 1, 2, 3 };
  public TransientExample() {
  }
}
