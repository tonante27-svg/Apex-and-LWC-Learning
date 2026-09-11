//Typed Sobject
// Compiler knows the existence of this account object
Account acc = new Account();
acc.Name = 'Test Account';
acc.Industry = 'Banking';
system.debug('account name is ==' + acc.Name);

// Generic sObject - compiler has no idea what that object is @ runtime:
sObject mysObject = new Account();
mysObject.put('Name', 'Test Account 2');
mysObject.put('Industry', 'Agriculture');
system.debug('Account name is ==' + mysObject.get('Name'));

mysObject = new Contact();
mysObject.put('FirstName', 'Test');
mysObject.put('LastName', 'Contact');
insert (Contact) mysObject;
system.debug('First name is ==' + mysObject.get('FirstName'));

//Operators
Integer a = 10;
Integer b = 5;
Integer c = a + b;
a = 10; // assignment operator
a += 5; // 10 + 5
a -= 3; // 15 - 3
a *= 2; // 24
a /= 4; // 6
//a = 10, b = 20;

//Logical Opertor

String Stage = 'Prospecting';
Decimal amount = 75000;
Boolean isHighValue = true;
if (stage == 'Prospecting' && amount > 50000) {
  System.debug('This is a high value opportunity');
}
String result = (amount >= 50000) ? 'HIgh' : 'Low';
System.debug(result);
