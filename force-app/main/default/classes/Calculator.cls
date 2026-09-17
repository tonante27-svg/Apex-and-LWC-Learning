public with sharing class Calculator {
  private Integer varOne;
  private Integer varTwo;

  public calculator(Integer varOne, Integer varTwo) {
    this.varOne = varOne;
    this.varTwo = varTwo;
  }

  public void add() {
    System.debug('Sum is: ' + (varOne + varTwo));
  }

  public void multiply() {
    System.debug('Product is: ' + (varOne * varTwo));
  }
}
