public with sharing class ContactManager {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String searchTerm) {
        // 1. Basic validation
        if (String.isBlank(searchTerm)) {
            return new List<Contact>();
        }

        // 2. Find the space character
        Integer spaceIndex = searchTerm.trim().indexOf(' ');
        
        // 3. Logic: If there is no space, we can't split Fname/Lname safely
        if (spaceIndex == -1) {
            // Option: Search just by LastName if only one word is provided
            return [SELECT Id, FirstName, LastName, Email, Account.Name 
                    FROM Contact 
                    WHERE LastName = :searchTerm.trim() 
                    LIMIT 10];
        }
        
        // 4. Split the string
        String fname = searchTerm.substring(0, spaceIndex).trim();
        String lname = searchTerm.substring(spaceIndex + 1).trim();
        
        return [SELECT Id, FirstName, LastName, Email, Account.Name 
                FROM Contact 
                WHERE FirstName = :fname 
                AND LastName = :lname 
                LIMIT 10];
    }
}