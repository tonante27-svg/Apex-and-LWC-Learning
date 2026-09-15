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
//Set<String>

Set<String> students = new Set<String>();
students.add('Amit');
students.add('Amit');
students.add('Rohan');
system.debug(students);

//addAll
list<String> newStudents = new List<String>{ 'Mohit', 'Mia', 'Satish' };
students.addAll(newStudents);

system.debug(students);
//Contains()
boolean hasAmit = students.contains('Amit');
system.debug(hasAmit);

//Remove
students.remove('Mia');
system.debug('No Mia. She is gone: ' + students);

//Size()

Integer totalStudents = students.size();
System.debug(totalStudents);

//Maps: roll # with student name
Map<Integer, String> studentMap = new Map<Integer, String>();
studentMap.put(101, 'Amit');
studentMap.put(102, 'Rohan');
system.debug(studentMap);
studentMap.put(101, 'Mohit');
system.debug(studentMap);
//Get() takes key
String studentName = studentMap.get(101);
system.debug(studentName);
//Remove
studentMap.remove(101);
system.debug('=== remove map ==' + studentMap);
//Clear
studentMap.clear();
system.debug('=== clear map ==' + studentMap);
//Contains
studentMap.put(103, 'Wooba');
system.debug(studentMap);
system.debug(studentMap.containsKey(103));
//isEMpty
system.debug('=== IsEmpty ===' + studentMap.isEmpty());
//keySet()
system.debug('=== keySet ===' + studentMap.keySet());
//values()
studentMap.put(104, 'Abe');
List<String> allStudents = studentMap.Values();
system.debug('=== Values Map ===' + allStudents);
//size
system.debug('=== Size ===' + studentMap.size());
// Clone
Map<Integer, String> clonedMap = studentMap.clone();
system.debug('=== Clone ===' + clonedMap.size());
system.debug('=== Clone ===' + clonedMap);
