public with sharing class DiscountService {
    @TestVisible
    private static Decimal calculateDiscount(Decimal amount) {
        if(amount > = 10000){
            return amount * 0.10;
        }else{
            return amount * 0.05;
        }
    }
}