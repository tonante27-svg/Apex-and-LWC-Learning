public with sharing class MathOperations {
  private Integer numSquared;
  public MathOperations(Integer numSquared) {
    this.numSquared = numSquared;
  }

  public Integer getSquare() {
    return numSquared * numSquared;
  }
}
