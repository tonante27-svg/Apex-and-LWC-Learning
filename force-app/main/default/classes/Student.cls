public with sharing class Student {
  public String name;
  public Integer age;

  public void printDetails() {
    System.debug('Name: ' + name + ', Age: ' + age);
  }
}
