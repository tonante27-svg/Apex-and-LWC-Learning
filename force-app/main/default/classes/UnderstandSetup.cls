@isTest
public with sharing class UnderstandSetup {
    @TestSetup
    public static void makeTestData(){
        Account acc = new Account(Name='Test Account');
        insert acc;
        Contact con = new Contact(FirstName = 'Test', LastName='Contact', AccountId = acc.Id);
        insert con;
    }
    @isTest
    public static void testCreatedData(){
            system.assertEquals(1, [select count() From Account]);
            system.assertEquals(1, [select count() From Contact]);
            account acc = [Select id ,name from Account Limit 1];
            acc.Name = 'Test Account Updated';
            update acc;
           
    }
     @isTest
    public static void testCreatedDataV2(){
            Account acc = [Select id ,name from Account Limit 1];
            system.assertNotEquals('Test Account Updated', acc.Name);
            system.assertEquals('Test Account', acc.Name);
           
    }
   
}