//1.
Account globalAcct = new Account(Name='Global Fin Corp');
insert globalAcct;
List<Contact> contactList =new List<Contact>{
    new Contact(LastName='Couldry',Email='jcouldry@globalfin.org', AccountId=globalAcct.Id),
    new Contact(LastName='Eckersly, Email='dekersley@globalfin.org', AccountId=globalAcct)
}
insert contactList;
for(Contact cont : contacList){
    cont.Title = 'Financial Advisor';
}
globalAcct.Rating = 'Hot';
update globalAcct;
update contactList;
//2.
List<Opportunity> opps = new List<Opportunity>();
for(Integer i=0;i <10; i++){
    opps.add(new Opportunity(
            Name='GlobalFinOpp'+i,
            AccountId=globalAcct.Id, 
            CloseDate = Last_N_Days:30,
            StageName='Prospecting'));
}

//3.
Contact globalContact1 =  contactList[0];
Case globalCase = new Case(
        Subject = 'Global Fin Amortization App Failure',
        ContactId=globalContact1.Id,
        Status='New',
        Origin='Web',

    );
    insert globalCase;
globalContact1.LastCaseDate = Date.Today();
Task t = new Task(
                    WhatId = globalCase.Id,
                    Subject = 'Follow up with customer',
                    Status = 'Not Started',
                    Priority = 'Normal',
                    WhoId=globalContact1.Id,
                    ActivityDate = Date.today().addDays(2);
                );
//4. 
List<Account> accountAcme = [SELECT Id FROM Account WHERE Name ='Acme Solutions' ];

List<Opportunity> opps = new List<Opportunity>();
for(Integer i=0;i < 4; i++){
    system.debug('=== DEBUG MOD === '+math.mod(i,2));
    if(math.mod(i,2)== 0){
        
        opps.add(new Opportunity(
            Name='AcmeSalesOpp'+i,
            AccountId=accountAcme[0].Id, 
            CloseDate = Date.today().addDays(30),
            StageName='Prospecting',
            Amount = 2000)
        );
    }
    
}

//5.
List<Account> accountsList = new List<Account>{
    new Account(Name='Baltazar Liquors'),
        new Account(Name='Grabowski Sports Gear'),
        new Account(Name='')
}
//6.
Database.SaveResults[] sr = Database.insert(accountsList);
if(sr.isSuccess()){
    sysetm.debug( 'Sucessful Accounts added '+sr.getId());
}else{
    
    for(Database.e=Error err : sr.getErrors()){
        for(Database.Error err : sr.getErrors()) {
            System.debug('Error status code: ' + err.getStatusCode());
            System.debug('Error message: ' + err.getMessage());
            System.debug('Fields that caused the error: ' + err.getFields());
        }
    }
}
list<Contact> contactList = [SELECT  Account.Name, Id, LastName, Emal FROM Contact where Account.Name Like 'Tech%' ];
for(Contct cont : contactList){
    cont.Title = 'TechAssociate';
}
if(!contactList.isEmpty()){
    pdate conatctList;
}
//7.
List<Account> acctList = new List<Account>{
    new Account(Name='Acme Corp.'),
     new Account(Name='Acme Corp.'),
      new Account(Name='Acme Corp.'),
}
insert acctList;
List<Contact> contactLists = new List<Contact>{
    new Contact(LastName='Redenbaker', email='oredenbaker@popcorn.com'),AccountId = acctList[0],
    new Contact(LastName='Flubacher', email='farchitetcsr@popcorn.com',AccountId = acctList[1]),
    new Contact(LastName='Gillis', email='dgillis@lughter.com',AccountId = acctList[2])
}
insert contactLists;
merge merge acctList[0] acctList[1] acctList[2];
//8.
List<Opportunity> opps = [Select Id from Opportunity where StageName='Closed Lost'];
Database.DeleteResult[] dr = Database.delete(opps);

List<Opportunity> delOppList = [Select Id FROM Opportunity WHERE StageName = 'Closed Lost' ALL ROWS];
undelete delOppList;