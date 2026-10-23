/**
 * Updates descriptions for Accounts asynchronously.
 */
public with sharing class FutureAccountUpdater {
        /**
         * Updates the descriptions of the specified Accounts asynchronously.
         *
         * @param accIds IDs of the Accounts to update
         */
@future
  public static void updateAccountDescriptions(Set<Id> accIds ){
        list<Account> accList = [
            SELECT Id, Description FROM Account WHERE Id IN: accIds
        ];
        for(Account acc : accList){
            acc.Description = 'Update Account Description via Future Method';
        }

        update accList;
    }
}