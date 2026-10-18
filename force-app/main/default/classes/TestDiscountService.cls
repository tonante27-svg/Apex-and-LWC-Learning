@IsTest
public class TestDiscountService {
    @IsTest
    public static void testDiscontServiceMethod() {
           Decimal result = DiscountService.calculateDiscount(10000);
           system.assertEquals(1000,result);
    }
}