/**
 * PartnerAccountHandler
 *
 * Handles partner-specific account logic. Extends the base AccountHandler for
 * partner-related customizations.
 */
public with sharing class PartnerAccountHandler extends AccountHandler {
  /**
   * Default constructor for PartnerAccountHandler.
   */
  public PartnerAccountHandler(String accountId) {
    super(accountId);
  }
  public void createInteractionLogin(String interaction) {
    Task interactionLog = new Task();
    interactionLog.Subject = 'Interaction Log';
    interactionLog.Description = 'Interaction Log';
    interactionLog.WhatId = accountId;
    interactionLog.Status = 'New';
    insert interactionLog;
  }
}
