/**
 * Provides account-related services for Lightning components.
 */
public with sharing class AccountService {
    /**
     * Retrieves up to 100 account records.
     *
     * @return A list of accounts.
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> listAccounts() {
        try {
            return [SELECT Id, Name, Industry, Phone, Type FROM Account LIMIT 100];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}