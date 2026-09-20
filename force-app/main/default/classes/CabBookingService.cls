public abstract with sharing class CabBookingService {
  // this is the common method for all types of classes so it is a 'concrete method'
  public virtual void bookACab() {
    system.debug('this is the common method to book a cab');
  }
  //process to calculate the fare keeps changing depending on type so we will make it abstract so that implementing class...
  //... cn\an override it or provide body for it,
  public abstract void calculateFare();
}
