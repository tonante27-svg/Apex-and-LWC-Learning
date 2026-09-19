public with sharing class Student2 {
  String name;
  Integer rollNumber, marks;

  public Student2(String name) {
    this.name = name;
    this.rollNumber = 0;
    this.marks = 0;
  }
  public Student2(String name, Integer rollNumer) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.marks = 0;
  }
  public Student2(String name, Integer rollName, Integer marks) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.marks = marks;
  }

  Boolean hasPassed() {
    return marks >= 40 ? true : false;
  }

  String getGrade() {
    if (marks >= 90) {
      return 'A';
    } else if (marks >= 70 && marks < 90) {
      return 'B';
    } else if (marks >= 50 && marks < 70) {
      return 'C';
    } else if (marks >= 40 && marks < 50) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
