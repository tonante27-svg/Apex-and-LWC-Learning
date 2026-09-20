/**
 * @description Prime cab booking service implementation.
 */
public with sharing class PrimeCabBookingService extends CabBookingService {
  /**
   * @description Calculates the fare for a prime cab booking.
   */
  public override void calculateFare() {
    System.debug('this is the implementing method of prime cab');
  }

  public override void bookACab() {
    super.bookACab();
    system.debug('This is the specific book a cab method for prime cabs');
  }
}
