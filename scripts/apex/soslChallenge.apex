//Find all records in your org that contain the word "Edge" in any searchable field of Account, Contact, or Opportunity.
String inputSearchStr= 'Edge';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Account,Contact,Opportunity];
// List<Account> accounts = searchResults[0];
// List<Contact> contacts = searchResults[1];
// List<Opportunity> opportunities = searchResults[2];

//2. Find Accounts and Contacts whose Name starts with “Sam”.
inputSearchStr= 'Sam*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Account,Contact];
// List<Account> accounts = searchResults[0];
// List<Contact> contacts = searchResults[1];

//3. Find records across Account and Contact objects that contain the phone number ‘1234’.
inputSearchStr= '1234';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN PHONE FIELDS RETURNING Account(Id,Name,Phone),Contact(Id,Name,Phone)];
// List<Account> accounts = searchResults[0];
// List<Contact> contacts = searchResults[1];

//4. Find records in Contact and Lead that contain the email ‘john@’.
inputSearchStr= 'jrogers@*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN EMAIL FIELDS RETURNING Lead (Id,Name,Email),Contact(Id,Name,Email)];
// List<Lead> leads = searchResults[0];
// List<Contact> contacts = searchResults[1];

//5. Find all Accounts and Contacts containing the word “Global”, but only return Accounts in ‘Customer’ Type and Contacts with Title not null.
inputSearchStr= 'Global*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN EMAIL FIELDS RETURNING Account(Id,Name WHERE Type='Customer - Direct'),Contact(Id,Nme,Title WHERE Title !=NULL)];
// List<Account> accounts = searchResults[0];
// List<Contact> contacts = searchResults[1];

//6.  Find the first 3 Accounts containing “Tech” in their fields, ordered by Name.
inputSearchStr= 'Tech*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Account(Id, Name WHERE NAME !=NULL ORDER BY LIMIT 3)];
// List<Account> accounts = searchResults[0];

//7. You want to find all Accounts, Contacts, and Opportunities that mention “Acme” anywhere.
inputSearchStr= 'Acme';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Account(Id,Name), Contact(Id,Name),Opportunity(Id,Name)];
// List<Account> accounts = searchResults[0];

//8- Fictional - You have a custom object Loan__c. Find records where Loan Name or Loan Description contain “Home”.
inputSearchStr= 'Home*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING Loan__c(Id,Name,Description)];
// List<Loan__c> loans = searchResults[0];

inputSearchStr= 'Agreement*';
// List<List<sObject>> searchResults = [FIND :inputSearchStr IN ALL FIELDS RETURNING ContentNote,ContentDocument];
// List<ContentNote> notes = searchResults[0];
// List<ContentVersion> docs = searchResults[1];

List<Account> accList = new List<Account>{
    new Account(Name='Acme Solutions'),
        new Account(Name='')
};
    
Database.SaveResult[] resultList = Database.insert(accList,false);
for (Database.SaveResult sr : resultList ){
    if(sr.isSuccess()){
        system.debug('Successfully inserted Account. ID: ' + sr.getId());
    }else{
        for(Database.Error err : sr.getErrors()) {
            System.debug('Error status code: ' + err.getStatusCode());
            System.debug('Error message: ' + err.getMessage());
            System.debug('Fields that caused the error: ' + err.getFields());
        }
        
    }
}