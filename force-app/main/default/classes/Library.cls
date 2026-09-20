public with sharing class Library {
  public static Integer totalBooks = 0;
  //
  public Library(Integer books) {
    totalBooks += books;
  }

  public static void totalBooks() {
    system.debug('total # of books in city: ' + totalBooks);
  }
}
