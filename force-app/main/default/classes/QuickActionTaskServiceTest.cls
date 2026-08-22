@IsTest
private with sharing class QuickActionTaskServiceTest {
   
    @IsTest
    private static void testMissingSubject(){
        Id someId;
    Test.startTest();
    someId = QuickActionTaskService.createTask('','Nothing so it should fail');
    Test.stopTest();
        System.assertEquals(null, someId, 'Expected null when subject is missing');
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
}