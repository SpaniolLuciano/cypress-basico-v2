Feature: Users

  Scenario: Get all users
    Given I access the jsonplaceholder page
    When I click on "Run script" button
    Then A GET request return all users
