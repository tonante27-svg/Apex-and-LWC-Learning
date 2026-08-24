@IsTest
private with sharing class QuickActionTaskServiceTest {
  
    @TestSetup
    static void makeUserData() {

        Profile p = [
            SELECT Id
            FROM Profile
            WHERE Name = 'Standard User'
            WITH USER_MODE
        ];

        User u2 = new User(
            Alias = 'newUser',
            Email = 'newuser@testorg.com',
            EmailEncodingKey = 'UTF-8',
            LastName = 'Testing',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            ProfileId = p.Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'newuser@testorg.com'
        );

        insert u2;
    }

    @IsTest
    private static void testMissingSubject(){
        Id someId;
    Test.startTest();
    try {
        QuickActionTaskService.createTask('', 'Nothing so it should fail');

        System.assert(false, 'Expected an AuraHandledException');
    } catch (AuraHandledException e) {
        System.assertEquals(
            'Script-thrown exception',
            e.getMessage()
        );
    }
    Test.stopTest();
       // System.assertEquals(null, someId, 'Expected null when subject is missing');
    }

      @IsTest
    private static void testCreatedTask(){
        Id someId;
    Test.startTest();
    someId = QuickActionTaskService.createTask('Test Task To Create','This test task should be created');
    Test.stopTest();
        Task atask = [SELECT Id, Subject, Description FROM Task WHERE Id=: someId LIMIT 1];
        System.assertNotEquals(null, someId, 'Expected a task Id to be returned');

        System.assertEquals('Test Task To Create',atask.Subject, 'Task subject does not match expected value');
    }

     @IsTest
    private static void testInAccessibleDescribe(){
        Id someId;
        User u2 = [SELECT Id FROM User where UserName = 'newuser@testorg.com' LIMIT 1] ;
        System.runAs(u2) {  
            Test.startTest();
            try {
                QuickActionTaskService.createTask('We have unaccessible description', 'Nothing so it should fail');

                System.assert(false, 'Expected an AuraHandledException');
            } catch (AuraHandledException e) {
                System.assertEquals(
                    'Script-thrown exception',
                    e.getMessage()
                );
            }            
            Test.stopTest();
            //System.assertEquals(null, someId, 'Expected null when subject is missing');
        }
    }

}