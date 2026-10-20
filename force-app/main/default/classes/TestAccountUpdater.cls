@IsTest
public with sharing class TestAccountUpdater {
    @TestSetup 
    public static void createData (){
        List<Account> accounts = new List<Account>();
        for(Integer i = 0; i <10; i++){
            accounts.add(
                new Account( Name = 'Account TestUpdater'+i)
            );
        }
        insert accounts;
    }

    @IsTest
    public static void testSuccessUpdates(){
        Set<Id> accIds = new Set<Id>();
        for(Account acct : [SELECT Id FROM Account]){
            accIds.add(acct.Id);
        }
        List<Account>  checkAccountUpdates = new  List<Account>();
        Test.startTest();
            if(!accIds.isEmpty()){
                AccountUpdater.updateAccountDescriptions(accIds);
            }
            checkAccountUpdates = [SELECT Id, Description FROM Account WHERE Id In:accIds  ];
        Test.stopTest();
        system.assertEquals('Update Account Description with AccountUpdater', checkAccountUpdates[0].Description);
    }
}