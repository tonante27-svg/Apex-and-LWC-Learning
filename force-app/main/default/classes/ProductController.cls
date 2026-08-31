public with sharing class ProductController {
  @AuraEnabled(cacheable=true)
  public static List<Product2> getProducts() {
    return [SELECT Id, Name, ProductCode FROM Product2 LIMIT 10];
  }

  @AuraEnabled(cacheable=true)
  public static Product2 getProductById(String productId) {
    return [
      SELECT Id, Name, ProductCode, Family
      FROM Product2
      WHERE ID = :productId
      LIMIT 1
    ];
  }
  @AuraEnabled(cacheable=true)
  public static List<Product2> getProductsByCode(String productCode) {
    return [
      SELECT Id, Name, ProductCode, Family
      FROM Product2
      WHERE ProductCode = :productCode
      LIMIT 10
    ];
  }
  @AuraEnabled(cacheable=true)
  public static List<Product2> getProductsByFilters(
    String productCode,
    String productFamily
  ) {
    return [
      SELECT Id, Name, ProductCode, Family
      FROM Product2
      WHERE ProductCode = :productCode AND Family = :productFamily
      LIMIT 10
    ];
  }
}
