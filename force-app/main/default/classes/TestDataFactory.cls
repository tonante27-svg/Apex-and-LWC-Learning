@IsTest
public with sharing class TestDataFactory {
    public static Account createNewAccount() {
        Account acc = new Account(
        name = 'Test Account',
        AnnualRevenue = 200000);
        insert acc;
        return acc;
    }
}