public with sharing class Shape {
  Integer length;
  Integer width;
  public Shape(Integer length, Integer width) {
    this.length = length;
    this.width = width;
  }

  // Print the area
  public Decimal calculateArea() {
    return length * width;
  }
}
