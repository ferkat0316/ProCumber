@sampleTestOnWeatherApi
Feature: I wanted to receive weather data for my city


  Scenario: I wanted to receive weather data for my city
    Given I have a city name that I need to get the weather data for
    When I send a city name to the weather api
    Then I should receive weather information

