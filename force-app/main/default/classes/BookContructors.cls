public with sharing class BookContructors {
  String title;
  String author;
  Decimal price;

  public BookContructors(String title) {
    this.title = title;
    this.author = 'Unknown';
    price = 0;
  }

  public BookContructors(String title, String author) {
    this.title = title;
    this.author = author;
    price = 0;
  }
  public BookContructors(String title, String author, Decimal price) {
    this.title = title;
    this.author = author;
    price = price;
  }

  void displayBookInfo() {
    system.debug(
      'Title: ' + title + '\n' + ' Author: ' + author + '\n' + ' Price:' + price
    );
  }

  void applyDiscount(Decimal percentage) {
    price = (percentage * price) - price;
  }
}
