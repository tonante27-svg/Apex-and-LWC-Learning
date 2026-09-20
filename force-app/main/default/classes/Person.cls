public with sharing class Person {
  public String name;
  public Integer age;
  public String gender;

  public void Read() {
    system.debug('This person can read');
  }

  public void bioData() {
    system.debug('The name  of this person is : ' + name);
    system.debug('The age of this person is : ' + age);
    system.debug('The sex  of this person is : ' + gender);
  }
}
