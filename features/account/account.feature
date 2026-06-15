Feature: Account Entity
  As a user of the personal finance system
  I want to create and manage accounts
  So that I can track my running balance accurately

  Background:
    Given the system supports currencies HKD, USD, EUR, GBP, CNY, JPY

  # Creation

  Scenario: Create a new account with a zero balance
    When I create a "HKD" account named "Main Checking"
    Then the account balance should be 0 cents in "HKD"

  # Deposits & Withdrawals

  Scenario: Deposit money into the account
    Given I have a "HKD" account named "Main Checking"
    When I deposit 5000 cents in "HKD"
    Then the account balance should be 5000 cents in "HKD"

  Scenario: Withdraw money from the account
    Given I have a "HKD" account named "Main Checking"
    And I deposit 5000 cents in "HKD"
    When I withdraw 2000 cents in "HKD"
    Then the account balance should be 3000 cents in "HKD"

  # Negative Balances (Overdrafts / Credit)

  Scenario: Withdraw more than the balance (Negative Balance)
    Given I have a "HKD" account named "Credit Card"
    When I withdraw 5000 cents in "HKD"
    Then the account balance should be -5000 cents in "HKD"

  # Currency Protections

  Scenario: Reject deposits in a different currency
    Given I have a "HKD" account named "Main Checking"
    When I attempt to deposit 1000 cents in "USD"
    Then I should receive a "CurrencyMismatchError"

  Scenario: Reject withdrawals in a different currency
    Given I have a "HKD" account named "Main Checking"
    When I attempt to withdraw 1000 cents in "USD"
    Then I should receive a "CurrencyMismatchError"