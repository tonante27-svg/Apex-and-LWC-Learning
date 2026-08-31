String prodCode = 'GC1060';
String prodFamily = 'Inverter';
List<Product2> products = [
  SELECT Id, Name, ProductCode, Family
  FROM Product2
  WHERE ProductCode = :prodCode AND Family = :prodFamily
  LIMIT 10
];

System.debug(products);
