//SOSL ueries have to be addedin apex code
// string inbputVar = 'edge';
// List<List<sObject>> searchResults =
// [FIND :inputVar IN ALL FIELDS RETURNING Account(id,name), Contact(Id,firstname,lastname)];

// List<Account> accounts= searchResults[0];
// List<Contact> contacts = searchResults[1];
// system.debug('contacts ====> '+contacts);
// system.debug('contacts ====> '+accounts);

//2.  W/O SOSL-SIOQL INJECTION PROTECTION
// string inputQueryStr = 'FIND \'edge*\' IN ALL FIELDS RETURNING Account(id,name),Contact(Id,firstname,lastname), Opportunity';
// inputQueryStr = String.escapeSingleQuotes(inputQueryStr);
// List<List<sObject>> searchResults = search.query(inputQueryStr);
// List<Account> accounts= searchResults[0];
// List<Contact> contacts = searchResults[1];
// List<Opportunity> opportunities = searchResults[2];
// system.debug('accounts ====> '+contacts);
// system.debug('contacts ====> '+accounts);
// system.debug('opportunities ====> '+opportunities);

//3. W SOQL-SOSL INJECTION PROTECTION (BIND VARIABLES)
string inputSearchStr  = 'edge*';

List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Account(id,name),Contact(Id,firstname,lastname), Opportunity];
List<Account> accounts= searchResults[0];
List<Contact> contacts = searchResults[1];
List<Opportunity> opportunities = searchResults[2];
system.debug('accounts ====> '+contacts);
system.debug('contacts ====> '+accounts);
system.debug('opportunities ====> '+opportunities);

