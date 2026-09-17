public with sharing class Book {
  public String title;
  public String author;
  public Book(String title, String author) {
    this.author = author;
    this.title = title;
  }

  public void printBooks() {
    System.debug('Title: ' + title + ', Author: ' + author);
  }
}
