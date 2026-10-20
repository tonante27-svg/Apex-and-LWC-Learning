public with sharing class AccountUpdater {
    public static void updateAccountDescriptions(Set<Id> accIds ){
        list<Account> accList = [
            SELECT Id, Description FROM Account WHERE Id IN: accIds
        ];
        for(Account acc : accList){
            acc.Description = 'Update Account Description with AccountUpdater';
        }

        update accList;
    }

}
