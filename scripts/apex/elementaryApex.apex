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

List<Integer> bunches = new List<Integer>{ 1, 5, 10, 20, 15, 8 };
for (Integer someValue : bunches) {
  if (someValue > 10) {
    system.debug('=== greater than 10 === ' + someValue);
  }
}

Set<String> fruitas = new Set<String>{
  'apple',
  'banana',
  'apple',
  'orange',
  'banana'
};
system.debug('==== a set of fruitas === ' + fruitas);

List<String> someorder = new List<String>{ 'one', 'two', 'three', 'four' };
system.debug('=== SOMEORDER === ' + someorder);
system.debug('=== reverse order is: ' + someorder.size());
for (Integer i = someorder.size() - 1; i >= 0; i--) {
  system.debug('Decremeneting: ' + someorder[i]);
}

List<Integer> list1 = new List<Integer>{ 5, 2, 9 };
List<Integer> list2 = new List<Integer>{ 3, 8, 1 };
list1.addAll(list2);
system.debug('=== full list 1 === ' + list1);
list1.sort();
system.debug('== SORTED LIST== ' + list1);
list1.remove(0);
Integer max = list1.size() - 1;
list1.remove(max);
system.debug('== rmeoved max and min LIST== ' + list1);
List<String> names = new List<String>{ 'John', null, '', 'Sara', ' ', 'Mike' };
max = names.size() - 1;
system.debug('=== Size of Array === ' + max);
List<String> backUp;
for (Integer i = 0; i < max; i++) {
  system.debug('== Strings null and blanks == ' + names[i]);
  if (names[i] == null || names[i].trim() == '') {
    names.remove(i);
  }
}
system.debug('== finale Name list with nulls and \'\'s removed== ' + names);
names.clear();
//#7
names = new List<String>{ 'Anna', 'John', 'Sanjay', 'Mark', 'Anita' };
backUp = new List<String>();
system.debug('=== Original List=====' + names);
for (String a_name : names) {
  if (a_name.to LowerCase().contains('an')) {
    backUp.add(a_name);
  }
}
if (!names.isEmpty()) {
  system.debug('==== All names containing AN ' + backUp);
}
Map<String, Integer> products = new Map<String, Integer>{
  'Pen' => 10,
  'Notebook' => 25,
  'Bag' => 50
};
Integer tempMax = 0;
String highestKey = '';
for (String prodName : products.keySet()) {
  Integer match = products.get(prodName);
  if (tempMax < match) {
    tempMax = match;
    highestKey = prodName;
  }
}
System.debug('=== HIGHEST price and Name === ' + tempMax + ' ' + highestKey);
Map<String, String> countryCapitals = new Map<String, String>{
  'India' => 'New Delhi',
  'USA' => 'Washington',
  'UK' => 'London',
  'Japan' => 'Tokyo'
};
if (!countryCapitals.containsKey('Germany')) {
  countryCapitals.put('Germany', 'Berlin');
}
system.debug('==== Map with Germany Adedd ==== ' + countryCapitals);
Set<String> items = new Set<String>{
  'Pen',
  'Book',
  'Bag',
  'Pen',
  'Pencil',
  'Bag'
};

List<String> listOfItems = new List<String>(items);
listOfItems.sort();
system.debug('==== 15 ---- ' + listOfItems);
//If
// Integer marks = 86;
// if(marks > 50){
//     system.debug('You are passed');
// }
// //If-Else
// Integer marks = 45;
// if(marks > 50){
//     system.debug('You are passed');
// }else{
//   system.debug('Better luck next time');
// }

// //If-Else-If
// Integer marks = 70;
// if(marks >= 90){
//     system.debug('Grade A');
// }else if(marks > 75 && marks < 90) {
//     system.debug('Grade B');
// }else if(marks > 60 && marks < 75) {
//     system.debug('Grade C');
// }else{
//     system.debug('Grade D');
// }
//Nested-IF
// Integer marks = 92;
// Boolean hasSubmitted = true;
// if(marks > 90){
//   if(hasSubmitted){
//     system.debug('Excellent grade');
//   }else{
//     system.debug(' Grade withheld due to assignment non submission');
//   }
// }else{
//   system.debug('You need to work harder');
// }
String day = 'Wednesday';
Switch on day{
  when 'Monday'{
    system.debug('Start of the week');
  }
  when 'Friday'{
    system.debug('Almost the end of the week');
  }
  when 'Saturday','Sunday'{
    system.debug('End of week');
  }
  when else{
    system.debug('Middle  of week');
  }
}
// //Traditional FOR Loops
// for(Integer i = 0;i< 5;i++){
//   System.debug('Interation'+i);
// }
//For Each Loop - Enhanced For Loop
// List<String> students = new List<String>{'Amit','Rohan','Kirti'};
// for(String currStudent : students){
//   system.debug(''Stuudent Name : '+currentStudent);
// }
//CIRCLE SOQL FOR
// for(Account currAccount : [SELECT Id, name FROM Account]){
//   system.debug('acc Name'+currAccount.name);
// }
//CHallenege Loops Conditionals 
//1
Integer score = 82;
System.debug(score >= 40 ? 'Pass' : 'Fail');
//2
Integer age = 19;
System.debug(age >= 18 ? 'Eligible for vote' : 'Not eligible');
//3
Integer marks = 88;
if(marks >= 90){
  system.debug('A');
}else if(marks >= 75 && marks < 90){
   system.debug('B');
}else if(marks >= 50 && marks < 75){
   system.debug('C');
}else{
  system.debug('F');
}

//4
Integer year = 2032;
system.debug( (Math.mod(year,4) == 0 && Math.mod(year,100) != 0) || Math.mod(year,400) == 0 ? 'Leap Year': 'Not a Leap Year');
//5
Integer num1 = 15;
Integer num2 = 15;
if(num1 > num2 ){
  system.debug('Num1 is greater than Num2');
}else if(num2 > num1){
  system.debug('Num2 is greater than Num1');
}else{
  system.debug('Equal');
}
//6
String role = 'Guest';
switch on role{
  When 'Admin'{
    system.debug('Admin – Full access');
  }
  when 'User'{
    system.debug('User – Limited access');
  }

  when 'Guest' {
    system.debug('Guest – View only');
  }
  when else{
    system.debug('Unknown role');
  }
}
//7
List<Integer> numbers = new List<Integer>{4,7,2,9,5};
for(Integer anumber : numbers){
  system.debug('== For Number '+anumber+' number * 2 = '+(anumber * 2));
}
//8
List<String> people = new List<String>{'Alice', 'Bob', 'Charlie', 'David'};
for(String person : people){
   if(person.toLowerCase().startsWith('c')){system.debug(person);}
}
//10
Boolean isActive = true;
Integer score = 78;
if(isActive && score >= 75){
  system.debug('Eligible');
}else{
  system.debug('Not Eligible');
}
//9 - F(n)  = F(n-1) + F(n-2)
Integer n= 9;
Integer a = 0;
Integer b = 1;
for(Integer i = 2; i<=n; i++){
  Integer next = a + b;
  a = b; // a = 1,2
  b= next ;
}
system.debug('=== Fibbonacci Number == '+b);