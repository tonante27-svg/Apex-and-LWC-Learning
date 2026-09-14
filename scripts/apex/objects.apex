Integer a = 12, b = 5;
system.debug('Complex Mulitplcation = ' + (a + b) * (a - b));

Integer score = 65;
String something = score > 40 ? 'Pass' : 'Fail';
system.debug(something);

String onevar = 'Salesforce';
String twovar = 'Apex';
system.debug(onevar + twovar);

Integer num = 18;
String results = Math.mod(num, 2) == 0 ? 'Even ' : 'Odd';
system.debug(results);

Integer age = 20;
results = age > 18 ? 'Adult' : 'Minor';
System.debug(results);

Boolean isActive = false;
results = isActive ? 'ActiveUser' : 'Inactive User';
System.debug(results);

String name = 'Delihi';
String who = name != null ? name : 'Unknown';

//Safe Navigator - checks ahead to see if the field has been created.
// Account acct;
// String acctName = acct?.Name;
// system.debug(acctName);
//Null Coalescing Operator
Account acct = new Account();
acct.Name = 'First Account';
String acctName = acct?.Name ?? 'Junk';
system.debug(acctName);

score = 9;
Integer realScore = score ?? 0;
system.debug(realScore);

Integer count = 10;
Integer realCount = count ?? 0;
system.debug(realCount);
//Collections - List
//add
List<String> fruits = new List<String>();
fruits.add('Apple');
system.debug(fruits);

//add(index,value)
fruits.add(0, 'Mango');
system.debug(fruits);
