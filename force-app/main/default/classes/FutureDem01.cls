public with sharing class FutureDem01 {
    @future
    public static void futureDemoMethod1() {
        system.debug('first future method');
        FutureDemo2.futureDemomethod2();
    }
}