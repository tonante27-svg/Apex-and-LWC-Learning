@IsTest
public with sharing class TestAccountUpdater {
    @TestSetup 
    public static void createData (){
       Account acc = TestDataFactory.createNewAccount();
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
           // checkAccountUpdates = [SELECT Id, Description FROM Account WHERE Id In:accIds  ];
        Test.stopTest();
        checkAccountUpdates = [SELECT Id, Description FROM Account WHERE Id In:accIds  ];

        system.assertEquals('Update Account Description with AccountUpdater', checkAccountUpdates[0].Description, 'Account Description Should be Updated');
    }

     @IsTest
    public static void testFailedUpdates(){
            Account acc = [SELECT Id,Description FROM Account Limit 1];
            AccountUpdater.updateAccountDescriptions(new Set<Id>{});
            Account  checkAccountUpdates = [SELECT Id,Description FROM Account WHERE Id=: acc.Id];
            system.assertEquals(null, checkAccountUpdates.Description, 'Account Update failed. No account created');
    }
}