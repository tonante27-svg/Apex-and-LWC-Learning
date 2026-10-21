/**
 * @description Handles Account record updates.
 */
public with sharing class AccountHandler {
    /**
     * @description Runs the Account trigger handler for before insert and update events.
     */
    public static void run() {
        if (Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)) {
            updateRating(Trigger.new);
        }
    }
    /**
     * @description Sets the rating to Hot when annual revenue exceeds 100,000.
     * @param accounts The accounts to update.
     */
    public static void updateRating(List<Account> accounts){
        System.debug('*** AccountHandler.updateRating EXECUTED ***');

        for(Account acct : accounts ){
            System.debug('Annual Revenue: ' + acct.AnnualRevenue);

            if(acct.AnnualRevenue != null && acct.AnnualRevenue > 100000){

                acct.Rating = 'Hot';
                System.debug('Rating assigned: ' + acct.Rating);
            }
        }
    }
}