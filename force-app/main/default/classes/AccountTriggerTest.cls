@IsTest
public with sharing class AccountTriggerTest {

    /**
     * Creates the test data shared by the test methods.
     */
    @TestSetup
    static void setUpData() {
        TestDataFactory.createNewAccount();
    }

    @IsTest
    static void testAccountRatingTrigger() {

        Account result = [
            SELECT Id, Name, Rating, AnnualRevenue
            FROM Account
            WHERE Name = 'Test Account'
            LIMIT 1
        ];

        System.assertEquals(
            200000,
            result.AnnualRevenue,
            'Annual Revenue should be 200000'
        );

        System.assertEquals(
            'Hot',
            result.Rating,
            'Rating should be set to Hot'
        );
    }
}