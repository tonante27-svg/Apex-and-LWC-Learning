@isTest(isParallel=true)
public with sharing class SampleTestClass {
    @isTest
    public static void testOne() {
        Account acc = new Account(name='Parallel Account 1');
        insert acc;
        system.assertNotEquals(null,acc.id,'Should never happen');
    }
    public static void testTwo() {
        Account acc = new Account(name='Parallel Account 2');
        insert acc;
        system.assertNotEquals(null,acc.id,'Should never happen');
    }

}