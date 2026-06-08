Feature: Money value object
  As the personal finance system
  I want to handle monetary amounts safely using integer cents
  So that all calculations are accurate and currency-safe

  Background:
    Given the system supports currencies HKD, USD, EUR, GBP, CNY, JPY

  Scenario: Create a valid HKD amount
    When I create an amount of 4250 cents in "HKD"
    Then the amount should have 4250 cents
    And the currency should be "HKD"
    And it should display as "HK$42.50"

  Scenario: Create a valid JPY amount (no decimal places)
    When I create an amount of 1000 cents in "JPY"
    Then the amount should have 1000 cents
    And it should display as "¥1,000"

  Scenario: Zero amount is valid
    When I create an amount of 0 cents in "HKD"
    Then the amount should have 0 cents
    And the currency should be "HKD"
    And it should display as "HK$0.00"

  Scenario: Reject non-integer cent values
    When I create an amount of 42.5 cents in "HKD"
    Then I should receive an "InvalidMoneyAmountError"

  Scenario: Reject negative cent values
    When I create an amount of -100 cents in "HKD"
    Then I should receive an "InvalidMoneyAmountError"

  Scenario: Add two amounts in the same currency
    Given I have an amount of 5000 cents in "HKD"
    And I have another amount of 3000 cents in "HKD"
    When I add them together
    Then the result should have 8000 cents in "HKD"

  Scenario: Reject addition of different currencies
    Given I have an amount of 5000 cents in "HKD"
    And I have another amount of 3000 cents in "USD"
    When I add them together
    Then I should receive a "CurrencyMismatchError"

  Scenario: Subtract a smaller amount from a larger one
    Given I have an amount of 10000 cents in "HKD"
    When I subtract 3000 cents in "HKD"
    Then the result should have 7000 cents in "HKD"

  Scenario: Subtract equal amounts results in zero
    Given I have an amount of 5000 cents in "HKD"
    When I subtract 5000 cents in "HKD"
    Then the result should have 0 cents in "HKD"

  Scenario: Reject subtraction of different currencies
    Given I have an amount of 5000 cents in "HKD"
    When I subtract 1000 cents in "USD"
    Then I should receive a "CurrencyMismatchError"

  Scenario: Compare two amounts — greater than
    Given I have an amount of 5000 cents in "HKD"
    Then it should be greater than 3000 cents in "HKD"

  Scenario: Compare two amounts — less than
    Given I have an amount of 2000 cents in "HKD"
    Then it should be less than 5000 cents in "HKD"

  Scenario: Two amounts with same cents and currency are equal
    Given I have an amount of 5000 cents in "HKD"
    Then it should equal 5000 cents in "HKD"

  Scenario: Same cents but different currency are not equal
    Given I have an amount of 5000 cents in "HKD"
    Then it should not equal 5000 cents in "USD"