public with sharing class Calculator2 {
  public static Integer add(Integer a, Integer b) {
    return (a + b);
  }

  private Boolean isEven(Integer num) {
    return Math.mod(num, 2) == 0 ? true : false;
  }

  public List<Integer> getEvenNumbers(List<Integer> numbers) {
    List<Integer> evenNumbers = new List<Integer>();

    for (Inetger someNum : numbers) {
      if (isEven(someNum)) {
        evenNumbers.add(someNum);
        printResult(someNum);
      }
    }
    return evenNumbers;
  }

  void printResult(Integer number) {
    system.debug(' Number ' + number + ' was an even number ');
  }
}
