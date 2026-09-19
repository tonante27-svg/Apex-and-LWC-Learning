//Car.startEngine();
// Calculator cs = new Calculator(23, 95);
// cs.add();
// cs.multiply();

// Student st = new Student();
// st.age = 22;
// st.name = 'Brandon Wiggins';
// st.printDetails();

// Book bk = new Book('Basic Economics', 'Thomas Sowell');
// bk.printBooks();

// ClassB cb = new ClassB();
// cb.dislayMessage();

// OrderService os = new OrderService(5, 15.29);
// os.getTotal();

// Shape s = new Shape(10, 5);
// system.debug('Area is: ' + s.calculateArea());
// MessagePrinter.printHello();
// WrapperClassV2.AccountWrapper aw = new WrapperClassV2.AccountWrapper();
// aw = WrapperClassV2.wrapperMethod('0017100000XXGe7AAH');
// system.debug('--  CONTACT LIST -- ' + aw.conList);
// system.debug('--  OPP LIST -- ' + aw.oppList);

// List<Contact> contacts = new List<Contact>();

// Contact someContact = new Contact(
//   LastName = 'Shoemacher',
//   Email = 'ershoes@gmail.com',
//   Phone = '813-590-2001'
// );

// contacts.add(someContact);
// someContact = new Contact(
//   LastName = 'Horvath',
//   Email = 'gracieh@gmail.com',
//   Phone = '813-590-2002'
// );
// contacts.add(someContact);

// someContact = new Contact(
//   LastName = 'Palmero',
//   Email = 'jpalm28@gmail.com',
//   Phone = '813-590-2003'
// );
// contacts.add(someContact);

// someContact = new Contact(
//   LastName = 'Kroger',
//   Email = 'hkroger@gmail.com',
//   Phone = '813-590-2004'
// );

// contacts.add(someContact);

// Integer isEven = 0;
// List<Contact> checkedContacts = new List<Contact>();
// for (Contact contact : contacts) {
//   ContactWrapper.Properties cwp = new ContactWrapper.Properties(
//     contact.LastName,
//     contact.Email,
//     contact.Phone
//   );
//   if (Math.mod(isEven, 2) == 0) {
//     cwp.selectContact();
//     checkedContacts.add(contact);
//   }
//   ++isEven;
// }

// String formattedDate = DateFormatter.dateFormatterMethod(System.today());
// System.debug('Formatter Date is: ===>> ' + formattedDate);

// AmountCalculator currOrder = new AmountCalculator();
// Decimal totalCartValue = currOrder.calculateAmount(1000);
// system.debug('TOTAL CAR VALUE ===>' + totalCartValue);

SpecialDiscountCalculator sdc = new SpecialDiscountCalculator();
system.debug(
  '== Total Discounted stuff ===> ' + sdc.SpecialDiscountCalculatorMethod(2000)
);
