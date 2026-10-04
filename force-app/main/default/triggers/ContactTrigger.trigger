trigger ContactTrigger on Contact (before insert) {
// This is a bad practice because we have. SOQL statement inside a for loop.
    for(Contact con : Trigger.new){
        if(con.AccountId != Null){
            //con.Account.Rating is the quickest solution.
            Account associatedAcc = [SELECT Id, Rating FROM Account WHERE Id = :con.AccountId LIMIT 1];
            if(associatedAcc.Rating != Null){
                  con.Account_Rating__c = associatedAcc.Rating;     
                }
        }
       
    }
}